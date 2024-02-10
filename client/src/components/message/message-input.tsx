import {
  Flex,
  Textarea,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useSendMessage } from '../../hooks/message';
import { CustomSocket } from '../../types';

type MessageInputProps = {
  socket: CustomSocket;
};

export const MessageInput = ({ socket }: MessageInputProps) => {
  const {
    register,
    sendMessageEnterHandler,
    onSendMessageSubmit,
    errors,
    reset,
  } = useSendMessage(socket);

  return (
    <Flex
      as='form'
      onSubmit={onSendMessageSubmit}
      bgColor='gray.800'
      px='10px'
      pt='10px'
      pb={{ base: '10px', md: '0px' }}
      height='auto'
      gap='12px'
      align='flex-start'
    >
      <FormControl isInvalid={!!errors.message}>
        <Textarea
          placeholder='Type a message'
          minH={'44px'}
          bgColor='gray.800'
          colorScheme='purple'
          aria-label='message'
          onKeyDown={(e) => sendMessageEnterHandler(e)}
          {...register('message', {
            onBlur: () => {
              reset();
            },
          })}
        />
        <FormErrorMessage>{errors?.message?.message}</FormErrorMessage>
      </FormControl>
      <Button
        h='44px'
        w='44px'
        colorScheme='purple'
        bgColor='purple.500'
        borderRadius='full'
        p='0px'
        flexShrink={0}
        type='submit'
      >
        <FiSend size={24} />
      </Button>
    </Flex>
  );
};
