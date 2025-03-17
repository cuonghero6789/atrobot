import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import client from '@/core/apollo/GraphQL';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useAuthStore from '@/stores/AuthStore';
import useAccountStore from '@/stores/AccountStore';
import { AuthAction } from '@/stores/interfaces/IAuthState';
import Loading, { CanShowLoading } from '@/components/Loading';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const status = useAuthStore(state => state.status);
  const actions = useAuthStore(state => state.actions);
  const loading = useAuthStore(state => state.loading);
  const actionsAcocunt = useAccountStore(state => state.actions);
  global.loadingRef = React.useRef<CanShowLoading>(null);

  useEffect(() => {
    actions.getCacheAuthUser();
    actionsAcocunt.getAccount();
  }, []);

  useEffect(() => {
    if (status === AuthAction.AUTH_HOME && !loading) {
      router.replace('/(tabs)');
    }
  }, [status, loading]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (<GestureHandlerRootView style={{ flex: 1 }}>
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="WebScreen" options={{ headerShown: false }} />
          <Stack.Screen name="AnswerScreen" options={{ headerShown: false }} />
          <Stack.Screen name="PlanetScreen" options={{ headerShown: false }} />
          <Stack.Screen name="questions" options={{ headerShown: false }} />
          <Stack.Screen name="personal" options={{ headerShown: false }} />
          <Stack.Screen name="UpdateInfo" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Loading ref={global.loadingRef} />
      </ThemeProvider>
    </ApolloProvider>
  </GestureHandlerRootView>
  );
}
