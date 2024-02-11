import { create } from 'zustand';
import { UserRoomType } from '../types';

type JoinedRoomsStore = {
  joinedRooms: UserRoomType[];
  setJoinedRooms: (joinedRooms: UserRoomType[]) => void;
};

export const useJoinedRoomsStore = create<JoinedRoomsStore>()((set) => ({
  joinedRooms: [],
  setJoinedRooms: (joinedRooms) => set({ joinedRooms: joinedRooms }),
}));
