import { useEffect } from 'react';
import { useBoolean, useToast } from '@chakra-ui/react';
import { useAuthStore, useJoinedRoomsStore, useSocketStore } from '../../store';
import { removeUserRoomApi } from '../../api/user';
import { isErrorWithMessage } from '../../utils';

export const useJoinRoomMutation = () => {
  const toast = useToast();
  const socket = useSocketStore((state) => state.socket);
  console.log('useJoinRoomMutation.socket', socket);
  const currentUser = useAuthStore((state) => state.currentUser);

  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );
  const joinedRooms = useJoinedRoomsStore((state) => state.joinedRooms);

  const [isMutating, setIsMutating] = useBoolean();

  const onChangeHandler = async (roomId: number) => {
    const alreadyJoinedRoom = joinedRooms.some((room) => room.id === roomId);

    try {
      setIsMutating.on();

      // Remove room if already joined
      if (alreadyJoinedRoom) {
        await removeUserRoomApi({ roomId });
        await getUserJoinedRooms();

        return;
      }

      // Join room
      if (!currentUser) return;
      socket.emit('join_room', {
        userId: currentUser.id,
        roomId: roomId,
        username: currentUser?.username,
      });
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

  useEffect(() => {
    if (!socket) return;
    // Listening for join room success
    socket.on('join_room_success', () => {
      getUserJoinedRooms();
    });

    // Error handling
    socket.on('join_room_error', (error) => {
      toast({
        position: 'top',
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });

    return () => {
      socket.off('join_room_success');
      socket.off('join_room_error');
    };
  }, [socket, toast, getUserJoinedRooms]);

  return {
    onChangeHandler,
    isMutating,
    joinedRooms,
  };
};
