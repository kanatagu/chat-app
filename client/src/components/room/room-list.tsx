import {
  Box,
  VStack,
  Button,
  useDisclosure,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiHash, FiPlus } from 'react-icons/fi';
import { MdManageSearch } from 'react-icons/md';
import { RoomCreateModal } from './index';
import { useJoinedRoomList } from '../../hooks/room';

type RoomListProps = {
  onDrawerClose?: () => void;
};

export const RoomList = ({ onDrawerClose }: RoomListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { joinedRooms, isLoading, currentRoom, roomClickHandler } =
    useJoinedRoomList(onDrawerClose);

  return (
    <Box>
      <Box mt={{ base: '0px', md: '16px' }} px='10px'>
        <Button
          gap='8px'
          size='sm'
          w='140px'
          justifyContent='flex-start'
          onClick={() => {
            navigate('/all-rooms');
            onDrawerClose && onDrawerClose();
          }}
        >
          <MdManageSearch />
          Browse Rooms
        </Button>
      </Box>

      <Box mt='10px' px='10px'>
        <Button
          gap='8px'
          size='sm'
          w='140px'
          justifyContent='flex-start'
          // TODO Double modal opens, need to change
          onClick={onOpen}
        >
          <FiPlus />
          Create Room
        </Button>
      </Box>
      <VStack
        align='start'
        gap={0}
        mt='10px'
        maxH={{ base: 'auto', md: 'calc(100vh - 240px)' }}
        overflow={'auto'}
      >
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                w='full'
                h='44px'
                borderRadius='md'
                mb='14px'
              />
            ))}
          </>
        ) : (
          <>
            {joinedRooms.map((room) => (
              <Flex
                key={room.id}
                role='button'
                tabIndex={0}
                onClick={() => roomClickHandler(room.id)}
                py='10px'
                px='10px'
                display='flex'
                alignItems='center'
                fontWeight='bold'
                fontSize='lg'
                gap='8px'
                color={room.id === currentRoom?.id ? 'gray.300' : 'gray.400'}
                bg={room.id === currentRoom?.id ? 'purple.800' : 'transparent'}
                w='full'
                _hover={{ textDecoration: 'none', bg: 'gray.800' }}
              >
                <FiHash size={20} />
                {room.name}
              </Flex>
            ))}
          </>
        )}
      </VStack>

      <RoomCreateModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
