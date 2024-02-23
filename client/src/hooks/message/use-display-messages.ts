import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { useToast } from '@chakra-ui/react';
import { getMessagesApi } from '../../api/message';
import { useSocketStore } from '../../store';

type MessageDisplayType = {
  username: string;
  imageIcon: string | null;
  time: string;
  message: string;
};

export const useDisplayMessages = (
  messagesPanelRef: React.RefObject<HTMLDivElement>
) => {
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();
  const toast = useToast();
  const socket = useSocketStore((state) => state.socket);

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

          // Order by time
          displayMessages.sort((a, b) => {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
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

  // Scroll to the most recent message
  useEffect(() => {
    if (!messagesPanelRef.current) return;
    messagesPanelRef.current.scrollTop = messagesPanelRef.current.scrollHeight;
  }, [messages, messagesPanelRef]);

  return {
    messages,
    isLoading,
  };
};
