import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { FiHash } from 'react-icons/fi';
import { useCurrentRoomStore } from '../../store';

type RoomDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RoomDetailsModal = ({
  isOpen,
  onClose,
}: RoomDetailsModalProps) => {
  const isCreatedUser = true;

  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody py='60px'>
          <VStack align='stretch' spacing='10px'>
            <Text fontWeight='bold' fontSize='xl' display='flex' gap='4px'>
              <Text as='span' w='20px'>
                <FiHash size={'100%'} />
              </Text>

              {currentRoom?.name}
            </Text>
            <Text fontSize='lg'>{currentRoom?.description}</Text>
          </VStack>

          <Box mt='30px'>
            {isCreatedUser ? (
              <Button
                colorScheme='red'
                mt='20px'
                w='full'
                variant='outline'
                onClick={() => console.log('delete this room')}
              >
                Delete this room
              </Button>
            ) : (
              <Button
                colorScheme='red'
                mt='20px'
                w='full'
                variant='outline'
                onClick={() => console.log('leave this room')}
              >
                Leave this room
              </Button>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
