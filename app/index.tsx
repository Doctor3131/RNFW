import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../components/navbar";
import { auth, db } from "../services/firebase.service";

interface Mahasiswa {
  id: string;
  nama: string;
  nim: string;
  jurusan: string;
}

export default function HomeScreen() {
  const [mahasiswaList, setMahasiswaList] = useState<Mahasiswa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [nama, setNama] = useState<string>("");
  const [nim, setNim] = useState<string>("");
  const [jurusan, setJurusan] = useState<string>("");

  const fetchMahasiswa = async () => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const mahasiswaCollection = collection(db, "mahasiswa");
      const snapshot = await getDocs(mahasiswaCollection);

      const list: Mahasiswa[] = snapshot.docs.map((doc) => {
        const data = doc.data() as any;
        return {
          id: doc.id,
          nama: data.nama || "",
          nim: data.nim || "",
          jurusan: data.jurusan || "",
        };
      });

      setMahasiswaList(list);
    } catch (error: any) {
      Alert.alert("Error", "Gagal mengambil data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMahasiswa = async () => {
    if (!nama.trim() || !nim.trim() || !jurusan.trim()) {
      Alert.alert("Error", "Semua field harus diisi");
      return;
    }

    if (!auth.currentUser) {
      Alert.alert("Error", "Anda harus login terlebih dahulu");
      return;
    }

    setSubmitting(true);

    try {
      const mahasiswaCollection = collection(db, "mahasiswa");
      const docRef = await addDoc(mahasiswaCollection, {
        nama: nama.trim(),
        nim: nim.trim(),
        jurusan: jurusan.trim(),
      });

      const newMahasiswa: Mahasiswa = {
        id: docRef.id,
        nama: nama.trim(),
        nim: nim.trim(),
        jurusan: jurusan.trim(),
      };

      setMahasiswaList([newMahasiswa, ...mahasiswaList]);

      Alert.alert("Berhasil", "Data mahasiswa berhasil ditambahkan");

      setNama("");
      setNim("");
      setJurusan("");
    } catch (error: any) {
      Alert.alert("Gagal", error.message || "Gagal menambahkan data mahasiswa");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchMahasiswa();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem: ListRenderItem<Mahasiswa> = ({ item }) => (
    <View style={styles.mahasiswaCard}>
      <Text style={styles.mahasiswaName}>{item.nama}</Text>
      <Text style={styles.cardText}>NIM: {item.nim}</Text>
      <Text style={styles.cardText}>Jurusan: {item.jurusan}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Data Mahasiswa</Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Tambah Mahasiswa</Text>

            <TextInput
              style={styles.input}
              placeholder="Nama Lengkap"
              value={nama}
              onChangeText={setNama}
              editable={!submitting}
            />

            <TextInput
              style={styles.input}
              placeholder="NIM"
              value={nim}
              onChangeText={setNim}
              keyboardType="numeric"
              editable={!submitting}
            />

            <TextInput
              style={styles.input}
              placeholder="Jurusan"
              value={jurusan}
              onChangeText={setJurusan}
              editable={!submitting}
            />

            <TouchableOpacity
              style={[styles.addButton, submitting && styles.addButtonDisabled]}
              onPress={handleAddMahasiswa}
              disabled={submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.addButtonText}>Tambah Data</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.mahasiswaSection}>
            <Text style={styles.sectionTitle}>Daftar Mahasiswa</Text>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7b5a43" />
                <Text style={styles.loadingText}>Mengambil data...</Text>
              </View>
            ) : mahasiswaList.length > 0 ? (
              <FlatList
                data={mahasiswaList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                refreshing={loading}
                onRefresh={fetchMahasiswa}
              />
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Belum ada data mahasiswa</Text>
                <Text style={styles.emptySubtext}>
                  Tambahkan data menggunakan form di atas
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Navbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d8c3a5",
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#5a3f31",
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  formSection: {
    margin: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b08969",
    elevation: 3,
  },
  mahasiswaSection: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5a3f31",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b08969",
    marginBottom: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#5a3f31",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  addButtonDisabled: {
    backgroundColor: "#b08969",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  mahasiswaCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#b08969",
    elevation: 3,
  },
  mahasiswaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a3f31",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    color: "#6a4a3c",
    marginTop: 3,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#6a4a3c",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6a4a3c",
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#7b5a43",
  },
});
