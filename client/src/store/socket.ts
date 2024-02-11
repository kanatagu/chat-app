import { create } from 'zustand';
import { io } from 'socket.io-client';
import { CustomSocket } from '../types';

type SocketStore = {
  socket: CustomSocket;
  setSocket: (socket: CustomSocket) => void;
};
export const useSocketStore = create<SocketStore>()((set) => ({
  socket: io('http://localhost:3000'),
  setSocket: (socket) => set({ socket: socket }),
}));
