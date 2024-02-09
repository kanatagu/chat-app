import { Flex, Textarea, Button } from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

export const MessageInput = () => {
  return (
    <Flex bgColor='gray.800' p='10px' minH='68px' gap='12px' align='center'>
      <Textarea
        placeholder='Type a message'
        minH={'100%'}
        bgColor='gray.800'
        colorScheme='purple'
      />
      <Button
        h='44px'
        w='44px'
        colorScheme='purple'
        bgColor='purple.500'
        borderRadius='full'
        p='0px'
        flexShrink={0}
      >
        <FiSend size={24} />
      </Button>
    </Flex>
  );
};
