import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

type RoomCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RoomCreateModal = ({ isOpen, onClose }: RoomCreateModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>room setting</p>
        </ModalBody>

        <ModalFooter>
          <Button mr='12px' onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='purple'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
