import { create } from 'zustand';
import { io } from 'socket.io-client';
import { CustomSocket } from '../types';

type SocketStore = {
  socket: CustomSocket;
  setSocket: (socket: CustomSocket) => void;
};

const socketURL =
  process.env.NODE_ENV === 'production'
    ? 'https://dev-chat.xyz'
    : 'http://localhost:3000';

console.log('socketURL', socketURL);

export const useSocketStore = create<SocketStore>()((set) => ({
  socket: io(socketURL),
  setSocket: (socket) => set({ socket: socket }),
}));
