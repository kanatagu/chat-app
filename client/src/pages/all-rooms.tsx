import { Flex, VStack, Heading } from '@chakra-ui/react';
import { Sidebar, SpHeader } from '../components/layout';
import { AllRooms } from '../components/room';
import { useIsMobile } from '../hooks/common/';

export const AllRoomsPage = () => {
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
        bgColor='gray.900'
        align='stretch'
        gap='20px'
        py={{ base: '10px', md: '40px' }}
        px={{ base: '16px', md: '80px' }}
      >
        <Heading as='h1'>All rooms</Heading>
        <AllRooms />
      </VStack>
    </Flex>
  );
};
