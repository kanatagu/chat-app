import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { getUserRoomsApi } from '../../api/user';
import { useCurrentRoomStore, useJoinedRoomsStore } from '../../store';

export const useJoinedRoomList = (onDrawerClose?: () => void) => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

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

  return {
    joinedRooms,
    isLoading,
    currentRoom,
    roomClickHandler,
  };
};
