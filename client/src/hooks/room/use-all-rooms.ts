import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { getAllRoomsApi } from '../../api/room';
import { RoomType } from '../../types';

export const useAllRooms = () => {
  const { showBoundary } = useErrorBoundary();
  const [allRooms, setAllRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        setIsLoading(true);
        const { data } = await getAllRoomsApi();
        setAllRooms(data);
        setIsLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchAllRooms();
  }, [showBoundary]);

  return {
    allRooms,
    isLoading,
  };
};
