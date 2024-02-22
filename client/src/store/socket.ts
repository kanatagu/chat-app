import { create } from 'zustand';
import { io } from 'socket.io-client';
import { CustomSocket } from '../types';

type SocketStore = {
  socket: CustomSocket;
  setSocket: (socket: CustomSocket) => void;
};

const socketURL =
  process.env.NODE_ENV === 'production'
    ? '/socket.io'
    : 'http://localhost:3000';

export const useSocketStore = create<SocketStore>()((set) => ({
  socket: io(socketURL),
  setSocket: (socket) => set({ socket: socket }),
}));
