import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Input,
  Textarea,
  Box,
} from '@chakra-ui/react';
import { useCreateRoom } from '../../hooks/room';

type RoomCreateModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RoomCreateModal = ({ isOpen, onClose }: RoomCreateModalProps) => {
  const { register, onCreateRoomSubmit, errors, isMutating } =
    useCreateRoom(onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Room</ModalHeader>
        <ModalCloseButton />
        <Box as='form' onSubmit={onCreateRoomSubmit}>
          <ModalBody>
            <VStack spacing='30px'>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Room name</FormLabel>
                <Input
                  placeholder='JavaScript'
                  bgColor='gray.800'
                  colorScheme='purple'
                  {...register('name')}
                />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder='You can talk about JavaScript here'
                  minH={'64px'}
                  bgColor='gray.800'
                  colorScheme='purple'
                  {...register('description')}
                />
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='purple' type='submit' isLoading={isMutating}>
              Create
            </Button>
            <Button onClick={onClose} ml='12px'>
              Close
            </Button>
          </ModalFooter>
        </Box>
      </ModalContent>
    </Modal>
  );
};
