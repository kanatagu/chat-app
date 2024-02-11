import {
  Box,
  VStack,
  Button,
  useDisclosure,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import { FiHash, FiPlus } from 'react-icons/fi';
import { RoomCreateModal } from './index';
import { useJoinedRoomList } from '../../hooks/room';

type RoomListProps = {
  onDrawerClose?: () => void;
};

export const RoomList = ({ onDrawerClose }: RoomListProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { joinedRooms, isLoading, currentRoom, roomClickHandler } =
    useJoinedRoomList(onDrawerClose);

  return (
    <Box>
      <VStack
        align='start'
        mt={{ base: '0px', md: '16px' }}
        gap={0}
        maxH={{ base: 'auto', md: 'calc(100vh - 207px)' }}
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
                bg={room.id === currentRoom?.id ? 'purple.800' : 'gray.800'}
                w='full'
                _hover={{ textDecoration: 'none', bg: 'gray.700' }}
              >
                <FiHash size={20} />
                {room.name}
              </Flex>
            ))}
          </>
        )}
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
