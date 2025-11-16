import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { storage } from '@/lib/storage';

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

// Helper functions to persist auth data
const persistAuthData = (user: User | null, token: string | null, refreshToken: string | null) => {
  if (user && token) {
    storage.set('auth.isAuthenticated', true);
    storage.set('auth.accessToken', token);

    storage.set('auth.refreshToken', refreshToken || '');
    storage.set('auth.user', JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }));
  } else {
    clearAuthData();
  }
};

const clearAuthData = () => {
  storage.remove('auth.isAuthenticated');
  storage.remove('auth.accessToken');
  storage.remove('auth.refreshToken');
  storage.remove('auth.user');
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,

  accessTokenExpiration: null,
  isLoading: true,

  loadPersistedAuth: () => {
    try {
      const isAuthenticated = storage.getBoolean('auth.isAuthenticated');
      const accessToken = storage.getString('auth.accessToken');
      const refreshToken = storage.getString('auth.refreshToken');
      const userJson = storage.getString('auth.user');

      if (isAuthenticated && accessToken && userJson) {

        const userData = JSON.parse(userJson);

        set({
          isAuth: true,
          accessToken,
          refreshToken: refreshToken || null,
          user: userData as User,

          isLoading: false,

        });

      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to load persisted auth:', error);
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

      return false;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();

      // Clear persisted auth data
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
    }
  },

  initAuthListener: () => {
    try {

      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {

          try {
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
          } catch (error) {
            console.error('Failed to get token:', error);

            // Clear persisted auth data on error
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
          // Clear persisted auth data when user is null
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
      });

      return unsubscribe;
    } catch (error) {

      console.error('Failed to initialize auth listener:', error);
      set({ isLoading: false });

      return () => { }; // Return empty function as fallback
    }
  },
}));
