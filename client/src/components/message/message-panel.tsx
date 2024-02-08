import { Box, Heading } from '@chakra-ui/react';

export const MessagePanel = () => {
  return (
    <Box
      w='100%'
      bgColor='gray.700'
      px={{ base: '16px', md: '20px' }}
      py={{ base: '10px', md: '0' }}
      h={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 32px)' }}
    >
      <Heading>Messages</Heading>
    </Box>
  );
};
