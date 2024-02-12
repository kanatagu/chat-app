import { useRef } from 'react';
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
  FormControl,
  FormErrorMessage,
  Flex,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHash, FiEdit, FiSend } from 'react-icons/fi';
import { useAuthStore, useCurrentRoomStore } from '../../store';
import { useUpdateRoom, useDeleteRoom } from '../../hooks/room';

type RoomDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RoomDetailsModal = ({
  isOpen,
  onClose,
}: RoomDetailsModalProps) => {
  const currentRoom = useCurrentRoomStore((state) => state.currentRoom);
  const currentUser = useAuthStore((state) => state.currentUser);
  const isCreatedUser = currentRoom?.created_user_id === currentUser?.id;

  const {
    isOpen: isDeleteConfirmOpen,
    onOpen: onDeleteConfirmOpen,
    onClose: onDeleteConfirmClose,
  } = useDisclosure();
  const cancelRef = useRef(null);

  const {
    register,
    errors,
    onUpdateRoomSubmit,
    isUpdating,
    showEditNameForm,
    setShowEditDescriptionForm,
    showEditDescriptionForm,
    setShowEditNameForm,
  } = useUpdateRoom(isOpen);
  const { deleteRoom, isDeleting } = useDeleteRoom(onDeleteConfirmClose);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py='40px'>
            <VStack
              align='stretch'
              spacing='10px'
              mt={isCreatedUser ? '20px' : '0px'}
            >
              {showEditNameForm ? (
                <form onSubmit={onUpdateRoomSubmit}>
                  <Flex
                    justifyContent='space-between'
                    align='flex-start'
                    gap='14px'
                  >
                    <FormControl isInvalid={!!errors.name}>
                      <Input
                        placeholder='JavaScript'
                        bgColor='gray.800'
                        colorScheme='purple'
                        aria-label='Room name'
                        w='full'
                        {...register('name')}
                      />
                      <FormErrorMessage>
                        {errors?.name?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      colorScheme='purple'
                      size='sm'
                      flexShrink={0}
                      type='submit'
                      isLoading={isUpdating}
                      isDisabled={isUpdating}
                      aria-label='Edit name'
                    >
                      <FiSend />
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Flex
                  justifyContent='space-between'
                  align='flex-start'
                  gap='14px'
                >
                  <Text
                    fontWeight='bold'
                    fontSize='xl'
                    display='flex'
                    gap='4px'
                    alignItems='center'
                  >
                    <span>
                      <FiHash size={20} />
                    </span>
                    {currentRoom?.name}
                  </Text>

                  {isCreatedUser && (
                    <Button
                      colorScheme='gray'
                      size='sm'
                      flexShrink={0}
                      onClick={() => setShowEditNameForm(true)}
                      aria-label='Show edit name form'
                    >
                      <FiEdit />
                    </Button>
                  )}
                </Flex>
              )}
              {showEditDescriptionForm ? (
                <form onSubmit={onUpdateRoomSubmit}>
                  <Flex
                    justifyContent='space-between'
                    align='flex-start'
                    gap='14px'
                  >
                    <FormControl isInvalid={!!errors.description}>
                      <Input
                        placeholder='JavaScript'
                        bgColor='gray.800'
                        colorScheme='purple'
                        aria-label='Room description'
                        w='full'
                        {...register('description')}
                      />
                      <FormErrorMessage>
                        {errors?.description?.message}
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      colorScheme='purple'
                      size='sm'
                      flexShrink={0}
                      type='submit'
                      isLoading={isUpdating}
                      aria-label='Edit description'
                    >
                      <FiSend />
                    </Button>
                  </Flex>
                </form>
              ) : (
                <Flex
                  justifyContent='space-between'
                  align='flex-start'
                  gap='14px'
                >
                  <Text
                    color='gray.300'
                    pl='20px'
                    display='flex'
                    gap='4px'
                    alignItems='center'
                  >
                    {currentRoom?.description}
                  </Text>

                  {isCreatedUser && (
                    <Button
                      colorScheme='gray'
                      size='sm'
                      flexShrink={0}
                      onClick={() => setShowEditDescriptionForm(true)}
                      aria-label='Show edit description form'
                    >
                      <FiEdit />
                    </Button>
                  )}
                </Flex>
              )}
            </VStack>

            {isCreatedUser && (
              <Box mt='30px'>
                <Button
                  colorScheme='red'
                  w='full'
                  variant='outline'
                  onClick={() => {
                    onClose();
                    onDeleteConfirmOpen();
                  }}
                  isLoading={isDeleting}
                >
                  Delete this room
                </Button>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody pt='60px'>
              <Text fontWeight='bold' fontSize='xl'>
                Are you sure you want to delete this room?
              </Text>
              <Text mt='10px'>*You can't undo this action afterwards.</Text>
            </AlertDialogBody>

            <AlertDialogFooter py='30px'>
              <Button ref={cancelRef} onClick={onDeleteConfirmClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => deleteRoom(currentRoom?.id)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
