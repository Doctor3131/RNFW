import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={[styles.navButton, isActive("/welcome") && styles.activeButton]}
        onPress={() => router.push("/welcome")}
      >
        <Text
          style={[styles.navText, isActive("/welcome") && styles.activeText]}
        >
          Welcome
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, isActive("/") && styles.activeButton]}
        onPress={() => router.push("/")}
      >
        <Text style={[styles.navText, isActive("/") && styles.activeText]}>
          Data
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    backgroundColor: "#5a3f31",
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#6a4a3c",
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 100,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#7b5a43",
  },

  navText: {
    color: "#d8c3a5",
    fontSize: 16,
    fontWeight: "600",
  },
  activeText: {
    fontWeight: "bold",
    color: "#ffffff",
  },
});
