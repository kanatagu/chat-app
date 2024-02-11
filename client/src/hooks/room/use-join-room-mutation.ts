import { useBoolean, useToast } from '@chakra-ui/react';
import { useJoinedRoomsStore } from '../../store';
import { joinRoomApi, removeUserRoomApi } from '../../api/user';
import { isErrorWithMessage } from '../../utils';

export const useJoinRoomMutation = () => {
  const toast = useToast();
  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );
  const joinedRooms = useJoinedRoomsStore((state) => state.joinedRooms);

  const [isMutating, setIsMutating] = useBoolean();

  const onChangeHandler = async (roomId: number) => {
    const alreadyJoinedRoom = joinedRooms.some((room) => room.id === roomId);

    try {
      setIsMutating.on();

      if (alreadyJoinedRoom) {
        await removeUserRoomApi({ roomId });
        await getUserJoinedRooms();
        return;
      }

      await joinRoomApi({ roomId });
      getUserJoinedRooms();
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

  return {
    onChangeHandler,
    isMutating,
    joinedRooms,
  };
};
