import { User } from "firebase/auth";
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV();

interface LoginInfo {
  uid: string;
  email: string | null;
}

export const saveLoginInfo = (user: User): void => {
  try {
    const userInfo: LoginInfo = {
      uid: user.uid,
      email: user.email,
    };
    storage.set("loginInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("MMKV Gagal menyimpan ke storage:", error);
  }
};

export const getLoginInfo = (): LoginInfo | null => {
  try {
    const value = storage.getString("loginInfo");
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("MMKV Gagal mengambil dari storage:", error);
    return null;
  }
};

export const clearLoginInfo = (): void => {
  try {
    // storage.clearAll();
    storage.remove("loginInfo");
  } catch (error) {
    console.error("MMKV Gagal menghapus dari storage:", error);
  }
};
