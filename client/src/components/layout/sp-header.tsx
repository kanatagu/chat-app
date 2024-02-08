import {
  Link as ChakraLink,
  Button,
  Flex,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { FiMenu, FiCoffee } from 'react-icons/fi';
import { AccountBar } from '../account';
import { RoomList } from '../room';

export const SpHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justifyContent='space-between' align='center' px='16px' py='8px'>
      <Button bgColor='gray.800' p='0px' onClick={onOpen}>
        <FiMenu size={24} />
      </Button>

      <ChakraLink
        as={ReactRouterLink}
        to='/'
        fontSize='2xl'
        fontWeight='700'
        color='purple.400'
        display='flex'
        alignItems='center'
        gap='8px'
        _hover={{ textDecoration: 'none', opacity: '.8' }}
      >
        <FiCoffee />
        Dev Chat
      </ChakraLink>

      <AccountBar />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor='gray.800' px='30px'>
            Rooms
          </DrawerHeader>

          <DrawerBody bgColor='gray.800' px='20px'>
            <RoomList onDrawerClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
