import { useRef } from 'react';
import { Flex, Heading, Text, useDisclosure, Button } from '@chakra-ui/react';
import { FiHash, FiUsers } from 'react-icons/fi';
import { useCurrentRoomStore } from '../../store';
import { RoomDetailsModal, RoomMembers } from '../room';

export const MessageHeader = () => {
  const btnRef = useRef(null);

  const {
    isOpen: isRoomDetailsOpen,
    onOpen: onRoomDetailsOpen,
    onClose: onRoomDetailsClose,
  } = useDisclosure();
  const {
    isOpen: isMembersOpen,
    onOpen: onMembersOpen,
    onClose: onMembersClose,
  } = useDisclosure();

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  return (
    <>
      <Flex
        borderBottom='1px solid'
        borderColor='gray.600'
        pb='10px'
        align='center'
        justify='space-between'
        gap='10px'
      >
        <Flex
          align='end'
          gap='10px'
          onClick={onRoomDetailsOpen}
          cursor='pointer'
          _hover={{
            opacity: '.8',
          }}
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

        <Button
          gap='10px'
          onClick={onMembersOpen}
          aria-label='See room members'
          ref={btnRef}
          size={{ base: 'sm', md: 'md' }}
        >
          <FiUsers />
          <Text as='span' display={{ base: 'none', md: 'inline-block' }}>
            Members
          </Text>
        </Button>
      </Flex>

      <RoomDetailsModal
        isOpen={isRoomDetailsOpen}
        onClose={onRoomDetailsClose}
      />

      <RoomMembers
        isOpen={isMembersOpen}
        onClose={onMembersClose}
        btnRef={btnRef}
      />
    </>
  );
};
