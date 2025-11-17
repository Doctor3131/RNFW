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

        <Text style={styles.header}>Register</Text>

        <View style={styles.form}>
          <Text>Username</Text>
          <TextInput
            placeholder="username"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <Text>Email</Text>
          <TextInput
            placeholder="email"
            style={styles.input}
          />

          <Text>Prodi</Text>
          <TextInput
            placeholder="prodi"
            style={styles.input}
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
          <Button label="Sign In" onPress={handleLogin} />
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
    // backgroundColor: '#f9f9f9',
  },

  card: {
    width: '100%',
    // backgroundColor: '#fff',
    padding: 20,
    // borderRadius: 12,
    // elevation: 4, // android shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },

  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  form: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#',
    // borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },

  buttonContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
});
