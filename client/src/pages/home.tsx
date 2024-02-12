import { Flex, VStack, Text, Heading, Button, Box } from '@chakra-ui/react';
import { MdManageSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <VStack
      w='100%'
      bgColor='gray.800'
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
      <Box mt='10px'>
        <Button
          gap='8px'
          size='lg'
          justifyContent='flex-start'
          onClick={() => {
            navigate('/all-rooms');
          }}
        >
          <MdManageSearch size={20} />
          Browse Rooms
        </Button>
      </Box>
    </VStack>
  );
};
