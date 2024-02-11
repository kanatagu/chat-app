import { Flex, VStack, Text, Heading } from '@chakra-ui/react';

export const HomePage = () => {
  return (
    <VStack
      w='100%'
      bgColor='gray.700'
      h={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 32px)' }}
      align='center'
      justify='center'
      gap='20px'
      py={{ base: '10px', md: '10px' }}
      px={{ base: '16px', md: '20px' }}
    >
      <Heading as='h1'>Welcome to Dev Chat!</Heading>
      <Flex align='center' gap='6px'>
        <Text fontSize='xl'>Select a room to start chatting</Text>
        <Text as='span' fontSize='30px'>
          ☕
        </Text>
      </Flex>
    </VStack>
  );
};
