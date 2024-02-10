import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CustomSocket } from '../../types';
import { useErrorBoundary } from 'react-error-boundary';
import { useToast } from '@chakra-ui/react';
import { getMessagesApi } from '../../api/message';

type MessageDisplayType = {
  username: string;
  imageIcon: string | null;
  time: string;
  message: string;
};

export const useDisplayMessages = (socket: CustomSocket) => {
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();
  const toast = useToast();

  const [messages, setMessages] = useState<MessageDisplayType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (roomId) {
          setIsLoading(true);
          const { data } = await getMessagesApi(roomId);
          const displayMessages = data.map((message) => {
            return {
              username: message.username,
              imageIcon: message.image_icon,
              time: message.created_at,
              message: message.message,
            };
          });
          setMessages(displayMessages);
          setIsLoading(false);
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchMessages();
  }, [showBoundary, roomId]);

  useEffect(() => {
    if (!socket) return;

    // Listening for new messages
    socket.on('new_message', (message) => {
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            username: message.username,
            imageIcon: message.image_icon,
            time: message.created_at,
            message: message.message,
          },
        ];
      });
    });

    return () => {
      socket.off('new_message');
    };
  }, [socket, roomId]);

  useEffect(() => {
    // Error handling
    socket.on('send_message_error', (error) => {
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
      socket.off('send_message_error');
    };
  }, [socket, toast]);

  return {
    messages,
    isLoading,
  };
};
