import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast, useBoolean } from '@chakra-ui/react';
import { roomSchema, RoomSchemaType } from '../../schema';
import { createRoomApi } from '../../api/room';
import { useAuthStore, useJoinedRoomsStore } from '../../store';
import { isErrorWithMessage } from '../../utils';
import { useNavigate } from 'react-router-dom';

export const useCreateRoom = (onClose: () => void) => {
  const navigate = useNavigate();
  const toast = useToast();

  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );
  const currentUser = useAuthStore((state) => state.currentUser);

  const [isMutating, setIsMutating] = useBoolean();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<RoomSchemaType>({
    resolver: zodResolver(roomSchema),
  });

  const createRoom = async (data: RoomSchemaType) => {
    try {
      setIsMutating.on();
      if (!currentUser) throw new Error('User not found');

      const res = await createRoomApi({
        userId: currentUser.id,
        name: data.name,
        description: data.description,
      });

      await getUserJoinedRooms();

      onClose();
      navigate(`/chat/${res.data.id}`);
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
    register,
    onCreateRoomSubmit: handleSubmit(createRoom),
    errors,
    isMutating,
  };
};
