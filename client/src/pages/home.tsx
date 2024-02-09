import { Flex, Box, VStack, Text, Heading } from '@chakra-ui/react';
import { Sidebar, SpHeader } from '../components/layout';
import { useIsMobile } from '../hooks/common/';

export const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      p={{ base: '0px', md: '16px' }}
    >
      {isMobile ? <SpHeader /> : <Sidebar />}

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
        <Text fontSize='xl'>Select a room to start chatting.</Text>
      </VStack>
    </Flex>
  );
};
