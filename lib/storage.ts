import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({

  id: 'auth-storage',
  // encryptionKey: 'your-encryption-key-here',
});
