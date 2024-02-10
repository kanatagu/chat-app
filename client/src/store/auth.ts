import { create } from 'zustand';
import { UserType } from '../types';
import { getUserApi } from '../api/user';

type AuthStore = {
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
  getUser: () => Promise<void>;
  isGettingUser: boolean;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  getUser: async () => {
    await getUserApi()
      .then((res) => set({ currentUser: res.data }))
      .catch(() => {})
      .finally(() => set({ isGettingUser: false }));
  },
  isGettingUser: true,
}));
