import { useAuthStore } from '@/store/authStore';
import { Text, StyleSheet, View, TextInput, ScrollView } from 'react-native';
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        <Text style={styles.headerLogin}>Login</Text>

        <View style={styles.form}>
          <Text>Username</Text>
          <TextInput
            placeholder="username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <Text>Password</Text>
          <TextInput
            placeholder="password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button label="Sign in" onPress={handleLogin} />
          <Button label="Sign up" onPress={() => alert('you pressed the button')} />
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: '#f5f6fa',
  },

  card: {
    width: '100%',
    // backgroundColor: '#fff',
    // borderRadius: 12,
    padding: 25,
    borderWidth: 1,
    borderColor: '#000',

    // shadow Android
    // elevation: 4,

    // shadow iOS
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
  },

  headerLogin: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  form: {
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 12,
    // borderRadius: 8,
    marginBottom: 15,
  },

  buttonContainer: {
    alignItems: 'center',
  },
});
