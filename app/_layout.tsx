import { useAuthStore } from '@/store/authStore';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout() {
  const { isAuth, isLoading, initAuthListener, loadPersistedAuth } = useAuthStore();

  useEffect(() => {
    // Load persisted auth data first

    loadPersistedAuth();

    // Then initialize Firebase auth listener

    const unsubscribe = initAuthListener();

    // Cleanup listener on unmount
    return unsubscribe;
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
