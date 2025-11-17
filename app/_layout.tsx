import { useAuthStore } from '@/store/authStore';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function RootLayout() {
  const { isAuth, isLoading, initAuthListener, loadPersistedAuth } = useAuthStore();

  useEffect(() => {
    console.log('🚀 App starting - initializing auth...');

    // Step 1: Load persisted auth data FIRST
    loadPersistedAuth();

    // Step 2: Initialize Firebase auth listener
    // This will either:
    // - Confirm the persisted session with Firebase
    // - Update with a new Firebase session
    // - Only clear if explicitly logged out
    const unsubscribe = initAuthListener();

    // Cleanup listener on unmount
    return () => {
      console.log('🧹 Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  // Show loading screen while checking auth status
  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log('📱 Rendering app - isAuth:', isAuth);

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
