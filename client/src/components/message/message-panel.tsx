import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useDisclosure,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { FiHash } from 'react-icons/fi';
import { useErrorBoundary } from 'react-error-boundary';
import { MessageItem, MessageInput } from './index';
import { RoomDetailsModal } from '../room';
import { getMessagesApi } from '../../api/message';
import { useParams } from 'react-router-dom';
import { MessageType } from '../../types';
import { useCurrentRoomStore } from '../../store';

export const MessagePanel = () => {
  const { roomId } = useParams();
  const { showBoundary } = useErrorBoundary();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (roomId) {
          setIsLoading(true);
          const { data } = await getMessagesApi(roomId);
          setMessages(data);
          setIsLoading(false);
        }
      } catch (error) {
        showBoundary(error);
      }
    };

    fetchMessages();
  }, [showBoundary, roomId]);

  console.log('messages', messages);

  return (
    <>
      <VStack
        w='100%'
        bgColor='gray.700'
        h={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 32px)' }}
        align='stretch'
        justify='space-between'
      >
        <Box
          py={{ base: '10px', md: '10px' }}
          px={{ base: '16px', md: '20px' }}
        >
          <Flex
            align='end'
            gap='10px'
            onClick={onOpen}
            cursor='pointer'
            _hover={{
              opacity: '.8',
            }}
            borderBottom='1px solid'
            borderColor='gray.600'
            pb='10px'
          >
            <Heading
              as='h1'
              display='flex'
              alignItems='center'
              fontSize={{ base: 'lg', md: '2xl' }}
              gap='4px'
            >
              <Text as='span' fontSize='sm' w={{ base: '16px', md: '20px' }}>
                <FiHash size={'100%'} />
              </Text>
              {currentRoom?.name}
            </Heading>
            <Text
              color='gray.400'
              display={'-webkit-box'}
              overflow={'hidden'}
              sx={{
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '1',
              }}
              fontSize={'sm'}
            >
              {currentRoom?.description}
            </Text>
          </Flex>

          <VStack
            align='start'
            gap='28px'
            mt={{ base: '10px', md: '16px' }}
            overflowY='auto'
            maxH={{ base: 'calc(100vh - 189px)', md: 'calc(100vh - 177px)' }}
          >
            {isLoading ? (
              <>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Flex gap='10px' key={index}>
                    <SkeletonCircle size='10' />
                    <Box>
                      <Skeleton h='16px' w='200px' />
                      <Skeleton h='20px' w='300px' mt='4px' />
                    </Box>
                  </Flex>
                ))}
              </>
            ) : (
              <>
                {messages.map((message, index) => (
                  <MessageItem
                    key={index}
                    username={message.username}
                    imageIcon={message.image_icon}
                    time={message.created_at}
                    message={message.message}
                  />
                ))}
              </>
            )}
          </VStack>
        </Box>

        <MessageInput />
      </VStack>

      <RoomDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
