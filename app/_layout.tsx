import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import client from '@/core/apollo/client';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAuthStore, useAccountStore } from '@/core/stores';
import { AuthAction } from '@/core/stores/interfaces/common/IAuthState';
import Loading, { CanShowLoading } from '@/components/Loading';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
import { setConfig } from '@/core';
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
    setConfig({
      API: {
        BASE_URL: 'https://api.astrolive.bot/v1',
        WS_URL: 'wss://api.astrolive.bot/ws',
        TIMEOUT: 30000,
        RETRY_ATTEMPTS: 3,
      },
      APP: {
        NAME: 'AstroBot',
        VERSION: '1.0.0',
        BUILD_NUMBER: '1',
      },
      LINKS: {
        TERMS: 'https://astrolive.bot/term.html',
        PRIVACY: 'https://astrolive.bot/privacy.html',
        SUPPORT: 'https://astrolive.bot/support.html',
      },
    });
    actions.getCacheAuthUser();
    actionsAcocunt.getAccount();
  }, []);

  useEffect(() => {
    if (status === AuthAction.AUTH_HOME && !loading) {
      router.replace('/(tabs)');
    } else if (!loading && status === AuthAction.AUTH_LOGIN) {
      router.replace("/(auth)");
    }
  }, [status, loading]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
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
          <Stack.Screen name="PlanetsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="questions" options={{ headerShown: false }} />
          <Stack.Screen name="personal" options={{ headerShown: false }} />
          <Stack.Screen name="UpdateInfo" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Loading ref={global.loadingRef} />
        <Toast />
      </ThemeProvider>
    </ApolloProvider>
  </GestureHandlerRootView>
  );
}
