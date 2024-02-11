import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getUserRoomsApi } from '../../api/user';
import {
  useAuthStore,
  useCurrentRoomStore,
  useJoinedRoomsStore,
  useSocketStore,
} from '../../store';

export const useJoinedRoomList = (onDrawerClose?: () => void) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();

  const socket = useSocketStore((state) => state.socket);
  const currentUser = useAuthStore((state) => state.currentUser);

  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const joinedRooms = useJoinedRoomsStore((state) => state.joinedRooms);
  const setJoinedRooms = useJoinedRoomsStore((state) => state.setJoinedRooms);

  const [isLoading, setIsLoading] = useState(false);

  const roomClickHandler = useCallback(
    (clickedRoomId: number) => {
      // For SP drawer
      onDrawerClose && onDrawerClose();

      navigate(`/chat/${clickedRoomId}`);
    },
    [navigate, onDrawerClose]
  );

  // Fetch the joined rooms
  useEffect(() => {
    if (joinedRooms.length) return;

    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const { data } = await getUserRoomsApi();
        setJoinedRooms(data);

        setIsLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchRooms();
  }, [showBoundary, roomClickHandler, joinedRooms, setJoinedRooms]);

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

  // Socket event
  useEffect(() => {
    if (socket) {
      // Leave the previous room
      if (currentUser && currentRoom) {
        socket.emit('leave_chat', {
          userId: currentUser.id,
          roomId: currentRoom.id,
        });
      }
    }
  }, [socket, currentUser, currentRoom, roomId]);

  return {
    joinedRooms,
    isLoading,
    currentRoom,
    roomClickHandler,
  };
};
