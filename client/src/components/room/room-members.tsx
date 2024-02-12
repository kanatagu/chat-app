import { RefObject } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  List,
  ListItem,
  Avatar,
} from '@chakra-ui/react';
import { Loading } from '../ui';
import { useRoomMembers } from '../../hooks/room';
import { iconImages } from '../../const';

type RoomMembersProps = {
  isOpen: boolean;
  onClose: () => void;
  btnRef: RefObject<HTMLButtonElement>;
};

export const RoomMembers = ({ isOpen, onClose, btnRef }: RoomMembersProps) => {
  const { roomMembers, isLoading } = useRoomMembers();

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader bgColor='gray.800'>Room Members</DrawerHeader>

        <DrawerBody bgColor='gray.800'>
          {isLoading ? (
            <Loading />
          ) : (
            <List display='flex' flexDir='column' gap='20px'>
              {roomMembers?.users.map((user) => {
                const userIcon =
                  iconImages.find((icon) => icon.name === user.image_icon)
                    ?.url || iconImages[0].url;

                return (
                  <ListItem
                    key={user.username}
                    display='flex'
                    alignItems='center'
                    gap='10px'
                    w='full'
                  >
                    <Avatar
                      name={user.username}
                      src={userIcon}
                      size={{ base: 'sm', md: 'md' }}
                    />
                    {user.username}
                  </ListItem>
                );
              })}
            </List>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
