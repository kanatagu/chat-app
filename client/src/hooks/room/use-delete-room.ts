import { useBoolean, useToast } from '@chakra-ui/react';
import { deleteRoomApi } from '../../api/room';
import { isErrorWithMessage } from '../../utils';
import { useJoinedRoomsStore } from '../../store';
import { useNavigate } from 'react-router-dom';

export const useDeleteRoom = (onDeleteConfirmClose: () => void) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [isMutating, setIsMutating] = useBoolean();

  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );

  const deleteRoom = async (roomId?: number) => {
    try {
      setIsMutating.on();
      if (!roomId) throw new Error('Room not found');

      await deleteRoomApi({ roomId });
      await getUserJoinedRooms();

      onDeleteConfirmClose();

      toast({
        position: 'top',
        title: 'Successfully deleted!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      let errorMessage = 'Sorry, error has occurred. Try again later.';

      if (isErrorWithMessage(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      toast({
        position: 'top',
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsMutating.off();
    }
  };
  return { deleteRoom, isDeleting: isMutating };
};
