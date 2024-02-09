import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getUserRoomsApi } from '../../api/user';
import { UserRoomType } from '../../types';
import { useCurrentRoomStore } from '../../store';

export const useJoinedRoomList = (onDrawerClose?: () => void) => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();

  const setCurrentRoom = useCurrentRoomStore((state) => state.setCurrentRoom);
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  const [joinedRooms, setJoinedRooms] = useState<UserRoomType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const roomClickHandler = useCallback(
    (clickedRoomId: number) => {
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
  }, [showBoundary, roomClickHandler, joinedRooms]);

  // Set the current room
  useEffect(() => {
    if (roomId) {
      const selectedRoomId = parseInt(roomId, 10);
      const room = joinedRooms.find(
        (joinedRoom) => joinedRoom.id === selectedRoomId
      );

      if (room) {
        setCurrentRoom(room);
      }
    }
  }, [roomId, setCurrentRoom, joinedRooms]);

  return {
    joinedRooms,
    isLoading,
    currentRoom,
    roomClickHandler,
  };
};
