import { VStack, Heading } from '@chakra-ui/react';
import { AllRooms } from '../components/room';

export const AllRoomsPage = () => {
  return (
    <VStack
      w='100%'
      align='stretch'
      gap='20px'
      py={{ base: '10px', lg: '40px' }}
      px={{ base: '16px', lg: '80px' }}
      h={{ base: 'calc(100vh - 62px)', md: 'calc(100vh - 32px)' }}
    >
      <Heading as='h1'>All rooms</Heading>
      <AllRooms />
    </VStack>
  );
};
