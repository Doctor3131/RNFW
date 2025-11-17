import { createMMKV } from 'react-native-mmkv';

// Create storage instance - re-use throughout the entire app
export const storage = createMMKV({
  id: 'auth-storage',
  // Optional: Add encryption for sensitive auth data
  // encryptionKey: 'your-secure-encryption-key-here',
});

// Type-safe storage helpers with error handling
export const storageHelpers = {
  // String operations
  setString: (key: string, value: string): boolean => {
    try {
      storage.set(key, value);

      return true;
    } catch (error) {
      console.error(`Failed to set string for key ${key}:`, error);

      return false;
    }
  },

  getString: (key: string): string | undefined => {
    try {
      return storage.getString(key);
    } catch (error) {
      console.error(`Failed to get string for key ${key}:`, error);

      return undefined;
    }
  },

  // Number operations
  setNumber: (key: string, value: number): boolean => {
    try {
      storage.set(key, value);

      return true;
    } catch (error) {
      console.error(`Failed to set number for key ${key}:`, error);

      return false;
    }
  },

  getNumber: (key: string): number | undefined => {
    try {
      return storage.getNumber(key);
    } catch (error) {
      console.error(`Failed to get number for key ${key}:`, error);

      return undefined;
    }
  },

  // Boolean operations
  setBoolean: (key: string, value: boolean): boolean => {
    try {
      storage.set(key, value);

      return true;
    } catch (error) {
      console.error(`Failed to set boolean for key ${key}:`, error);

      return false;
    }
  },

  getBoolean: (key: string): boolean | undefined => {
    try {
      return storage.getBoolean(key);
    } catch (error) {
      console.error(`Failed to get boolean for key ${key}:`, error);

      return undefined;
    }
  },

  // Object operations (JSON serialize/deserialize)
  setObject: <T>(key: string, value: T): boolean => {
    try {
      const jsonString = JSON.stringify(value);

      storage.set(key, jsonString);

      return true;
    } catch (error) {
      console.error(`Failed to set object for key ${key}:`, error);

      return false;
    }
  },

  getObject: <T>(key: string): T | null => {
    try {
      const jsonString = storage.getString(key);

      if (!jsonString) return null;

      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error(`Failed to get object for key ${key}:`, error);

      return null;
    }
  },

  // Buffer operations
  setBuffer: (key: string, value: ArrayBuffer): boolean => {
    try {
      storage.set(key, value);

      return true;
    } catch (error) {
      console.error(`Failed to set buffer for key ${key}:`, error);

      return false;
    }
  },

  getBuffer: (key: string): ArrayBuffer | undefined => {
    try {
      return storage.getBuffer(key);
    } catch (error) {
      console.error(`Failed to get buffer for key ${key}:`, error);

      return undefined;
    }
  },

  // Key operations
  contains: (key: string): boolean => {
    try {
      return storage.contains(key);
    } catch (error) {
      console.error(`Failed to check if key ${key} exists:`, error);

      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      storage.remove(key);

      return true;
    } catch (error) {
      console.error(`Failed to remove key ${key}:`, error);

      return false;
    }
  },

  getAllKeys: (): string[] => {
    try {
      return storage.getAllKeys();
    } catch (error) {
      console.error('Failed to get all keys:', error);

      return [];
    }
  },

  clearAll: (): boolean => {
    try {
      storage.clearAll();

      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);

      return false;
    }
  },

  // Storage management
  getSize: (): number => {
    try {
      return storage.size;
    } catch (error) {
      console.error('Failed to get storage size:', error);

      return 0;
    }
  },

  trim: (): boolean => {
    try {
      storage.trim();

      return true;
    } catch (error) {
      console.error('Failed to trim storage:', error);

      return false;
    }
  },

  // Encryption management
  recrypt: (encryptionKey?: string): boolean => {
    try {
      storage.recrypt(encryptionKey);

      return true;
    } catch (error) {
      console.error('Failed to recrypt storage:', error);

      return false;
    }
  },
};
