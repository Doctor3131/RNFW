import { useAuthStore } from '@/store/authStore';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const { isAuth } = useAuthStore();

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
    </Stack >
  );
}
