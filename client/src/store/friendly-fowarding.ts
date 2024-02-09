import { create } from 'zustand';

type FriendlyForwardingStore = {
  redirectTo: string | null;
  setRedirectTo: (path: string | null) => void;
};

export const useFriendlyForwardingStore = create<FriendlyForwardingStore>()(
  (set) => ({
    redirectTo: null,
    setRedirectTo: (path) => set({ redirectTo: path }),
  })
);
