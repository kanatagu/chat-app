import { VStack, Heading } from '@chakra-ui/react';
import { AllRooms } from '../components/room';

export const AllRoomsPage = () => {
  return (
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
  );
};