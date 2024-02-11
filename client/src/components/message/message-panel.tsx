import { Box, Flex, VStack, SkeletonCircle, Skeleton } from '@chakra-ui/react';
import { MessageItem, MessageInput } from './index';
import { useDisplayMessages } from '../../hooks/message';
import { MessageHeader } from './index';

export const MessagePanel = () => {
  const { messages, isLoading } = useDisplayMessages();

  console.log('messages', messages);

  return (
    <>
      <VStack
        w='100%'
        bgColor='gray.800'
        h={{ base: 'calc(100vh - 62px)', md: 'calc(100vh - 32px)' }}
        align='stretch'
        justify='space-between'
      >
        <Box
          py={{ base: '10px', md: '10px' }}
          px={{ base: '16px', md: '20px' }}
          flexShrink={1}
          overflow='hidden'
        >
          <MessageHeader />

          <VStack
            align='start'
            gap='28px'
            mt={{ base: '10px', md: '16px' }}
            overflowY='auto'
            maxH={{ base: 'calc(100vh - 194px)', md: 'calc(100vh - 172px)' }}
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
                    imageIcon={message.imageIcon}
                    time={message.time}
                    message={message.message}
                  />
                ))}
              </>
            )}
          </VStack>
        </Box>

        <MessageInput />
      </VStack>
    </>
  );
};
