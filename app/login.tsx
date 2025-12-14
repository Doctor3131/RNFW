import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../services/firebase.service";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      Alert.alert("Error", "Email dan password tidak boleh kosong");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      setLoading(false);
      router.replace("/welcome");
    } catch (error: any) {
      console.error("Login gagal:", error.code);
      let errorMessage = error.message;

      if (error.code === "auth/user-not-found") {
        errorMessage = "Akun tidak ditemukan";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Password salah";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Format email tidak valid";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Terlalu banyak percobaan. Coba lagi nanti.";
      }

      Alert.alert("Login Gagal", errorMessage);
      setLoading(false); // Hanya set false kalau error
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Masuk</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword((s) => !s)}
          accessibilityLabel={
            showPassword ? "Sembunyikan password" : "Tampilkan password"
          }
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#7b5a43"
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity onPress={goToRegister}>
              <Text style={styles.registerLink}>Daftar di sini</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#d8c3a5",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#5a3f31",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 12,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b08969",
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#5a3f31",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: { fontSize: 14, color: "#6a4a3c" },
  registerLink: { fontSize: 14, color: "#7b5a43", fontWeight: "600" },
  passwordContainer: { position: "relative", marginBottom: 15 },
  passwordInput: { paddingRight: 44 },
  eyeButton: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 14,
    justifyContent: "center",
    padding: 4,
  },
});
