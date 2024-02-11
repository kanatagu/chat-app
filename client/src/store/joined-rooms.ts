import { create } from 'zustand';
import { UserRoomType } from '../types';
import { getUserRoomsApi } from '../api/user';
import { useErrorBoundary } from 'react-error-boundary';

type JoinedRoomsStore = {
  joinedRooms: UserRoomType[];
  setJoinedRooms: (joinedRooms: UserRoomType[]) => void;
  getUserJoinedRooms: () => Promise<void>;
};

export const useJoinedRoomsStore = create<JoinedRoomsStore>()((set) => ({
  joinedRooms: [],
  setJoinedRooms: (joinedRooms) => set({ joinedRooms: joinedRooms }),
  getUserJoinedRooms: async () => {
    await getUserRoomsApi()
      .then((res) => set({ joinedRooms: res.data }))
      .catch((error) => {
        useErrorBoundary().showBoundary(error);
      });
  },
}));
