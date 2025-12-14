import { Stack, useRouter, useSegments } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { auth } from "../services/firebase.service";
import { getLoginInfo, saveLoginInfo } from "../services/mmkv.service";

const AuthContext = createContext<{
  setIsAuthenticated: (value: boolean) => void;
} | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};

const RootLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );
  const [hasInitialRouted, setHasInitialRouted] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const saved = getLoginInfo();

    if (saved) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      const stored = getLoginInfo();
      if (currentUser) {
        saveLoginInfo(currentUser);
        setIsAuthenticated(true);
        return;
      }

      if (!currentUser && !stored) {
        setIsAuthenticated(false);
        return;
      }

      if (!currentUser && stored) {
        return;
      }
    });

    return unsub;
  }, []);

  useEffect(() => {
    if (isAuthenticated === undefined) return;

    const inAuth = segments[0] === "login" || segments[0] === "register";
    const isRootOrEmpty = !segments[0];

    if (isAuthenticated && isRootOrEmpty && !hasInitialRouted) {
      router.replace("/welcome");
      setHasInitialRouted(true);
      return;
    }

    if (!isAuthenticated && !inAuth) {
      router.replace("/login");
    }
  }, [isAuthenticated, segments]);

  if (isAuthenticated === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7b5a43" />
        <Text style={styles.loadingText}>Memuat sesi...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ setIsAuthenticated }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d8c3a5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6a4a3c",
  },
});

export default RootLayout;
