import { useState, useEffect } from 'react';
import { RoomDetailsType } from '../../types';
import { useErrorBoundary } from 'react-error-boundary';
import { getRoomDetailsApi } from '../../api/room';
import { useParams } from 'react-router-dom';

export const useRoomMembers = () => {
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();
  const [roomMembers, setRoomMembers] = useState<RoomDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRoomMembers = async () => {
      try {
        setIsLoading(true);
        const { data } = await getRoomDetailsApi({
          roomId: Number(roomId),
        });
        setRoomMembers(data);
        setIsLoading(false);
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchRoomMembers();
  }, [showBoundary, roomId]);

  return {
    roomMembers,
    isLoading,
  };
};
