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
    set({ isGettingUser: true });
    const res = await getUserApi();
    set({ currentUser: res.data });
    set({ isGettingUser: false });
  },
  isGettingUser: false,
}));
