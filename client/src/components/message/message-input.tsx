import {
  Flex,
  Textarea,
  Button,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useSendMessage } from '../../hooks/message';

export const MessageInput = () => {
  const {
    register,
    sendMessageEnterHandler,
    onSendMessageSubmit,
    errors,
    reset,
  } = useSendMessage();

  return (
    <Flex
      as='form'
      onSubmit={onSendMessageSubmit}
      bgColor='gray.900'
      pt='14px'
      pb={{ base: '16px', md: '0px' }}
      px={{ base: '16px', md: '0px' }}
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
        aria-label='Edit message'
        type='submit'
      >
        <FiSend size={24} />
      </Button>
    </Flex>
  );
};
