import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useAuthStore,
  useCurrentRoomStore,
  useJoinedRoomsStore,
  useSocketStore,
} from '../../store';

export const useSetCurrentRoom = () => {
  const { roomId } = useParams();

  const socket = useSocketStore((state) => state.socket);
  const currentUser = useAuthStore((state) => state.currentUser);
  const joinedRooms = useJoinedRoomsStore((state) => state.joinedRooms);
  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);

  // Set the current room and join the room in the socket
  useEffect(() => {
    if (roomId) {
      const selectedRoomId = parseInt(roomId, 10);
      const room = joinedRooms.find(
        (joinedRoom) => joinedRoom.id === selectedRoomId
      );

      if (room) {
        setCurrentRoom(room);
      }

      if (currentUser) {
        socket.emit('join_chat', {
          userId: currentUser.id,
          roomId: Number(roomId),
          username: currentUser.username,
        });
      }
    }
  }, [roomId, setCurrentRoom, joinedRooms, currentUser, socket]);
};
