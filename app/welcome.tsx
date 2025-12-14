import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "./_layout";
import Navbar from "../components/navbar";
import { auth } from "../services/firebase.service";
import { clearLoginInfo, getLoginInfo } from "../services/mmkv.service";

export default function WelcomeScreen() {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();
  const loginInfo = getLoginInfo();
  const userName = loginInfo?.email?.split("@")[0] || "Pengguna";

  const handleLogout = async () => {
    try {
      clearLoginInfo();
      setIsAuthenticated(false);
      router.replace("/login");
      await signOut(auth);
    } catch (error: any) {
      Alert.alert("Logout Gagal", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Selamat Datang!</Text>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.infoText}>
          Gunakan menu di bawah untuk navigasi
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8c3a5",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#5a3f31",
    marginBottom: 10,
    textAlign: "center",
  },
  userName: {
    fontSize: 24,
    color: "#7b5a43",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  infoText: {
    fontSize: 16,
    color: "#6a4a3c",
    textAlign: "center",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#5a3f31",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
