import { create } from 'zustand';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';

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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  initAuthListener: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuth: false,
  accessToken: null,
  refreshToken: null,
  user: null,

  accessTokenExpiration: null,

  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      set({
        isAuth: true,
        accessToken: token,
        user,
        refreshToken: user.refreshToken || null,
        accessTokenExpiration: null,
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        set({
          isAuth: true,
          accessToken: token,
          user,
          refreshToken: user.refreshToken || null,
          accessTokenExpiration: null,
        });
      } else {
        set({
          isAuth: false,
          accessToken: null,
          user: null,
          refreshToken: null,
          accessTokenExpiration: null,
        });
      }
    });

  },
}));
