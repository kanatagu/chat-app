import { KeyboardEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { messageSchema, MessageSchemaType } from '../../schema';
import { CustomSocket } from '../../types';
import { useAuthStore, useCurrentRoomStore } from '../../store';

export const useSendMessage = (socket: CustomSocket) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageSchemaType>({
    resolver: zodResolver(messageSchema),
  });

  const sendMessage = (data: MessageSchemaType) => {
    console.log('submit!', data);

    if (currentRoom && currentUser) {
      socket.emit('send_message', {
        message: data.message,
        userId: currentUser.id,
        roomId: currentRoom.id,
      });

      reset();
    }
  };

  const sendMessageEnterHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(sendMessage)();
    }
  };

  return {
    register,
    sendMessageEnterHandler,
    onSendMessageSubmit: handleSubmit((d) => sendMessage(d)),
    errors,
    reset,
  };
};
