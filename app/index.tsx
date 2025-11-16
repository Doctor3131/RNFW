import { router } from 'expo-router';
import { View } from 'react-native';

import Button from '@/components/Button';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Button title="Login" onPress={() => router.push("/login")} /> */}
      {/* <Button title="Register" onPress={() => router.push("/register")} /> */}

      <Button label='Login' onPress={() => router.push('/login')} />
      <Button label='Register' onPress={() => router.push('/register')} />
    </View>
  );
}
