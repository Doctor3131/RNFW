import { useAuthStore } from '@/store/authStore';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout() {
  const { isAuth, isLoading, initAuthListener } = useAuthStore();

  useEffect(() => {
    // Initialize Firebase auth listener when app starts
    initAuthListener();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Protected guard={isAuth}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isAuth}>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>

  );

}
