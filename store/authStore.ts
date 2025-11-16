import { create } from 'zustand';

interface AuthStore {
  isAuth: boolean
  setIsAuth: (isAuth: boolean) => void

  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),

  login: () => set({ isAuth: true }),
  logout: () => set({ isAuth: false }),
}));
