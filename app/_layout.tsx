import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
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
import NetworkIndicator from '@/components/NetworkIndicator';
import ConfigUtil from '@/core/utils/config/ConfigUtil';
import { ensureDeviceIdInitialized } from '@/core/utils/device/DeviceInfoUtil';

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
        BASE_URL: ConfigUtil.URL_MAIN,
        WS_URL: ConfigUtil.URL_WS,
        TIMEOUT: 30000,
        RETRY_ATTEMPTS: 3,
      },
      APP: {
        NAME: 'AstroBot',
        VERSION: '1.0.0',
        BUILD_NUMBER: '1',
      },
      LINKS: {
        TERMS: ConfigUtil.URL_TERM_OF_USE,
        PRIVACY: ConfigUtil.URL_PRIVACY,
        SUPPORT: 'https://astrolive.bot/support.html',
      },
    });
    ensureDeviceIdInitialized().catch(() => {});
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

  if (loading) {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
  }
  
  return (<GestureHandlerRootView style={{ flex: 1 }}>
    <NetworkIndicator />
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="LuckyDay" options={{ headerShown: false }} />
          <Stack.Screen name="WebScreen" options={{ headerShown: false }} />
          <Stack.Screen name="AnswerScreen" options={{ headerShown: false }} />
          <Stack.Screen name="PlanetScreen" options={{ headerShown: false }} />
          <Stack.Screen name="PlanetsScreen" options={{ headerShown: false }} />
          <Stack.Screen name="questions" options={{ headerShown: false }} />
          <Stack.Screen name="personal" options={{ headerShown: false }} />
          <Stack.Screen name="UpdateInfo" options={{ headerShown: false }} />
          <Stack.Screen name="WeeklyDetail" options={{ headerShown: false }} />
          <Stack.Screen name="LuckyCategoryDay" options={{ headerShown: false }} />
          <Stack.Screen name="StarMateDetail" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="dark" backgroundColor="#fff" />
        <Loading ref={global.loadingRef} />
        <Toast />
      </ThemeProvider>
    </ApolloProvider>
  </GestureHandlerRootView>
  );
}
