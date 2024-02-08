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

type AccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AccountModal = ({ isOpen, onClose }: AccountModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Profile setting</p>
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
