import { useAuthStore } from '@/store/authStore';
import { Text, StyleSheet, View, TextInput } from 'react-native';

import Button from '@/components/Button';
import { useState } from 'react';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleLogin = async () => {
    const success = await login(username, password);

    if (!success) {
      alert('Login Failed Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogin}>

        <View style={[styles.subContainerLogin, { alignItems: 'center', flex: 1 / 2 }]}>
          <Text style={styles.headerLogin}>Login</Text>
        </View>

        <View style={styles.subContainerLogin}>
          <Text>Username</Text>
          <TextInput placeholder='username' style={styles.input} value={username} onChangeText={setUsername} />

          <Text>Password</Text>
          <TextInput placeholder='password' secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
        </View>

        <View style={[{ alignItems: 'center', alignContent: 'center', flex: 1 / 2 }]}>
          <Button label='Sign In' onPress={handleLogin} />
        </View>

      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLogin: {
    width: 300,
    height: 360,
    borderWidth: 1,
    justifyContent: 'center',
  },
  headerLogin: {
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    alignContent: 'center',
    padding: 10,
  },
  subContainerLogin: {
    flex: 1,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
});
