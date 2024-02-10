import { create } from 'zustand';
import { UserRoomType } from '../types';

type CurrentRoomStore = {
  currentRoom: UserRoomType | null;
  setCurrentRoom: (user: UserRoomType | null) => void;
};

export const useCurrentRoomStore = create<CurrentRoomStore>()((set) => ({
  currentRoom: null,
  setCurrentRoom: (user) => set({ currentRoom: user }),
}));
