import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { storageHelpers } from '@/lib/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBcNV5-WyatsufVr0c-HjZyyoO5-Y0rlrE',
  authDomain: 'mogalancarrnfm.firebaseapp.com',
  projectId: 'mogalancarrnfm',
  storageBucket: 'mogalancarrnfm.firebasestorage.app',
  messagingSenderId: '221002225862',
  appId: '1:221002225862:web:95da8d15d78825d4b3dfc7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Storage keys as constants to avoid typos
const STORAGE_KEYS = {
  IS_AUTHENTICATED: 'auth.isAuthenticated',
  ACCESS_TOKEN: 'auth.accessToken',
  REFRESH_TOKEN: 'auth.refreshToken',
  USER: 'auth.user',
} as const;

interface AuthStore {
  isAuth: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  accessTokenExpiration: number | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initAuthListener: () => (() => void);
  loadPersistedAuth: () => void;
}

// Simplified user data for storage
interface StoredUserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Helper functions to persist auth data
const persistAuthData = (
  user: User | null,
  token: string | null,
  refreshToken: string | null,
): void => {
  if (user && token) {
    storageHelpers.setBoolean(STORAGE_KEYS.IS_AUTHENTICATED, true);
    storageHelpers.setString(STORAGE_KEYS.ACCESS_TOKEN, token);
    storageHelpers.setString(STORAGE_KEYS.REFRESH_TOKEN, refreshToken || '');

    const userData: StoredUserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    storageHelpers.setObject(STORAGE_KEYS.USER, userData);
  } else {
    clearAuthData();
  }
};

const clearAuthData = (): void => {
  storageHelpers.remove(STORAGE_KEYS.IS_AUTHENTICATED);
  storageHelpers.remove(STORAGE_KEYS.ACCESS_TOKEN);
  storageHelpers.remove(STORAGE_KEYS.REFRESH_TOKEN);
  storageHelpers.remove(STORAGE_KEYS.USER);
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  accessTokenExpiration: null,
  isLoading: true,

  loadPersistedAuth: () => {
    try {
      // Check if auth data exists
      if (!storageHelpers.contains(STORAGE_KEYS.IS_AUTHENTICATED)) {
        set({ isLoading: false });

        return;
      }

      const isAuthenticated = storageHelpers.getBoolean(STORAGE_KEYS.IS_AUTHENTICATED);
      const accessToken = storageHelpers.getString(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = storageHelpers.getString(STORAGE_KEYS.REFRESH_TOKEN);
      const userData = storageHelpers.getObject<StoredUserData>(STORAGE_KEYS.USER);

      // Validate all required data exists
      if (isAuthenticated && accessToken && userData) {
        console.log('✅ Loaded persisted auth for user:', userData.email);
        set({
          isAuth: true,
          accessToken,
          refreshToken: refreshToken || null,
          user: userData as unknown as User,
          isLoading: false,
        });
      } else {
        // Clear incomplete auth data
        console.log('⚠️ Incomplete auth data, clearing...');
        clearAuthData();
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('❌ Failed to load persisted auth:', error);
      clearAuthData();
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Persist auth data
      persistAuthData(user, token, user.refreshToken || null);

      set({
        isAuth: true,
        accessToken: token,
        user,
        refreshToken: user.refreshToken || null,
        accessTokenExpiration: null,
        isLoading: false,
      });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      clearAuthData();

      return false;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
      clearAuthData();

      set({
        isAuth: false,
        accessToken: null,
        user: null,
        refreshToken: null,
        accessTokenExpiration: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local data even if Firebase signOut fails
      clearAuthData();
      set({
        isAuth: false,
        accessToken: null,
        user: null,
        refreshToken: null,
        accessTokenExpiration: null,
      });
    }
  },

  initAuthListener: () => {
    let isInitialLoad = true;

    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log('🔔 Firebase auth state changed:', user ? user.email : 'null');

        if (user) {
          try {
            const token = await user.getIdToken();

            persistAuthData(user, token, user.refreshToken || null);

            set({
              isAuth: true,
              accessToken: token,
              user,
              refreshToken: user.refreshToken || null,
              accessTokenExpiration: null,
              isLoading: false,
            });

            console.log('✅ Auth state updated with Firebase user');
          } catch (error) {
            console.error('❌ Failed to get token:', error);
            clearAuthData();

            set({
              isAuth: false,
              accessToken: null,
              user: null,
              refreshToken: null,
              accessTokenExpiration: null,
              isLoading: false,
            });
          }
        } else {
          // CRITICAL: Only clear auth data if this is NOT the initial load
          // or if we're already not authenticated
          const currentAuthState = get().isAuth;

          if (isInitialLoad && currentAuthState) {
            // First load with persisted auth - don't clear yet
            // Firebase might still be initializing
            console.log('⏳ Initial load, keeping persisted auth...');
            set({ isLoading: false });
          } else {
            // Explicitly logged out or no persisted auth
            console.log('🚪 Clearing auth data (logged out or no session)');
            clearAuthData();

            set({
              isAuth: false,
              accessToken: null,
              user: null,
              refreshToken: null,
              accessTokenExpiration: null,
              isLoading: false,
            });
          }
        }

        // After first run, it's no longer initial load
        isInitialLoad = false;
      });

      return unsubscribe;
    } catch (error) {
      console.error('❌ Failed to initialize auth listener:', error);
      set({ isLoading: false });

      return () => { }; // Return empty function as fallback
    }
  },
}));
