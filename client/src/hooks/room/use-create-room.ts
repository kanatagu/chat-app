import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { roomSchema, RoomSchemaType } from '../../schema';
import { createRoomApi } from '../../api/room';
import { useAuthStore, useJoinedRoomsStore } from '../../store';
import { isErrorWithMessage } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { getUserRoomsApi } from '../../api/user';

export const useCreateRoom = (onClose: () => void) => {
  const navigate = useNavigate();
  const toast = useToast();

  const setJoinedRooms = useJoinedRoomsStore((state) => state.setJoinedRooms);
  const currentUser = useAuthStore((state) => state.currentUser);

  const [isMutating, setIsMutating] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<RoomSchemaType>({
    resolver: zodResolver(roomSchema),
  });

  const createRoom = async (data: RoomSchemaType) => {
    console.log('submit!', data);

    try {
      setIsMutating(true);
      if (!currentUser) throw new Error('User not found');

      const res = await createRoomApi({
        userId: currentUser.id,
        name: data.name,
        description: data.description,
      });

      console.log('res', res);

      const { data: userJoinedRooms } = await getUserRoomsApi();

      setJoinedRooms(userJoinedRooms);

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
      setIsMutating(false);
    }
  };

  return {
    register,
    onCreateRoomSubmit: handleSubmit(createRoom),
    errors,
    isMutating,
  };
};
