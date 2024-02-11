import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast, useBoolean } from '@chakra-ui/react';
import { roomSchema, RoomSchemaType } from '../../schema';
import { updateRoomApi } from '../../api/room';
import { useCurrentRoomStore, useJoinedRoomsStore } from '../../store';
import { isErrorWithMessage } from '../../utils';
import { useEffect } from 'react';

export const useUpdateRoom = (isOpen: boolean) => {
  const toast = useToast();

  const [showEditNameForm, setShowEditNameForm] = useState(false);
  const [showEditDescriptionForm, setShowEditDescriptionForm] = useState(false);

  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  const [isMutating, setIsMutating] = useBoolean();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RoomSchemaType>({
    resolver: zodResolver(roomSchema),
  });

  // Set defaultValues as soon as currentRoom is available
  useEffect(() => {
    if (currentRoom && !isOpen) {
      reset();
      setValue('name', currentRoom.name);
      setValue('description', currentRoom.description);
    }
  }, [currentRoom, setValue, isOpen, reset]);

  const updateRoom = async (data: RoomSchemaType) => {
    console.log('submit!', data);
    if (showEditNameForm || showEditDescriptionForm) {
      console.log('submit!!!!!', data);

      try {
        setIsMutating.on();
        if (!currentRoom) throw new Error('Room not found');

        await updateRoomApi({
          roomId: currentRoom.id,
          name: data.name,
          description: data.description,
        });

        await getUserJoinedRooms();

        toast({
          position: 'top',
          title: 'Successfully updated!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setShowEditNameForm(false);
        setShowEditDescriptionForm(false);
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
    }
  };

  return {
    register,
    onUpdateRoomSubmit: handleSubmit(updateRoom),
    errors,
    isUpdating: isMutating,
    reset,
    showEditNameForm,
    setShowEditNameForm,
    showEditDescriptionForm,
    setShowEditDescriptionForm,
  };
};
