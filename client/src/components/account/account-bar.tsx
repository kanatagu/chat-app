import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useAuthContext } from '../../providers';
import defaultIcon from '../../assets/account-icon/default.svg';
import { AccountModal } from './index';

const dummyUser = {
  username: 'John Doe',
  id: 1,
  roms: [],
  image_icon: '',
};

export const AccountBar = () => {
  const [iconSrc, setIconSrc] = useState(defaultIcon);
  const { currentUser } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(iconSrc);

  useEffect(() => {
    const fetchIcon = async () => {
      if (!dummyUser.image_icon) return;

      const icon = dummyUser.image_icon;

      import(`../../assets/account-icon/${icon}.jpg`).then((module) => {
        console.log('module', module.default);
        setIconSrc(module.default);
      });
    };

    fetchIcon();
  });

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          bgColor={{ base: 'transparent', md: 'gray.900' }}
          h={'auto'}
          p={{ base: '0px', md: '10px' }}
          sx={{
            span: {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            },
          }}
          _hover={{
            opacity: '.8',
          }}
          _active={{
            opacity: '.8',
          }}
        >
          <Avatar name={dummyUser.username} src={iconSrc} bg={'gray.100'} />
          <Box
            fontWeight='bold'
            fontSize='lg'
            display={{ base: 'none', md: 'block' }}
          >
            {dummyUser.username}
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>Profile</MenuItem>
          <MenuItem
            gap='8px'
            sx={{
              svg: {
                color: 'purple.400',
              },
            }}
          >
            <FiLogOut size={20} />
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      <AccountModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
