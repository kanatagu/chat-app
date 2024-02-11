import { Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { FiHash } from 'react-icons/fi';
import { useCurrentRoomStore } from '../../store';
import { RoomDetailsModal } from '../room';

export const MessageHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  return (
    <>
      <Flex
        align='end'
        gap='10px'
        onClick={onOpen}
        cursor='pointer'
        _hover={{
          opacity: '.8',
        }}
        borderBottom='1px solid'
        borderColor='gray.600'
        pb='10px'
      >
        <Heading
          as='h1'
          display='flex'
          alignItems='center'
          fontSize={{ base: 'lg', md: '2xl' }}
          gap='4px'
        >
          <Text as='span' fontSize='sm' w={{ base: '16px', md: '20px' }}>
            <FiHash size={'100%'} />
          </Text>
          {currentRoom?.name}
        </Heading>
        <Text
          color='gray.400'
          display={'-webkit-box'}
          overflow={'hidden'}
          sx={{
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '1',
          }}
          fontSize={'sm'}
        >
          {currentRoom?.description}
        </Text>
      </Flex>

      <RoomDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
