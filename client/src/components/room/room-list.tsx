import { Box, VStack, Button, useDisclosure, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiHash, FiPlus } from 'react-icons/fi';
import { useQuery } from '../../hooks/common';
import { RoomCreateModal } from './index';

const dummy = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'TypeScript',
  },
  {
    id: 3,
    name: 'React',
  },
  {
    id: 4,
    name: 'Vue',
  },
  {
    id: 5,
    name: 'Angular',
  },
];

type RoomListProps = {
  onDrawerClose?: () => void;
};

export const RoomList = ({ onDrawerClose }: RoomListProps) => {
  const query = useQuery();
  const roomIdQuery = query.get('roomId');
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onNavigate = (clickedRoomId: number) => {
    onDrawerClose && onDrawerClose();
    navigate(`/?roomId=${clickedRoomId}`);
  };

  return (
    <Box>
      <VStack align='start' mt={{ base: '0px', md: '16px' }} gap={0}>
        {dummy.map((room) => (
          <Flex
            onClick={() => onNavigate(room.id)}
            py='10px'
            px='10px'
            display='flex'
            alignItems='center'
            fontWeight='bold'
            fontSize='lg'
            gap='8px'
            color={room.id === Number(roomIdQuery) ? 'gray.300' : 'gray.400'}
            bg={room.id === Number(roomIdQuery) ? 'purple.800' : 'gray.800'}
            w='full'
            _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            key={room.id}
          >
            <FiHash size={20} />
            {room.name}
          </Flex>
        ))}
      </VStack>

      <Box mt='20px' px='10px'>
        <Button
          gap='8px'
          // TODO Double modal opens, need to change
          onClick={onOpen}
        >
          <FiPlus />
          Create Room
        </Button>
      </Box>

      <RoomCreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
