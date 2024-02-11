import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import defaultIcon from '../../assets/account-icon/default.svg';
import { useLogout } from '../../hooks/auth';

export const AccountBar = () => {
  const navigate = useNavigate();

  const [iconSrc, setIconSrc] = useState(defaultIcon);
  const currentUser = useAuthStore((state) => state.currentUser);
  const { logout, isMutating } = useLogout();

  useEffect(() => {
    const fetchIcon = async () => {
      if (!currentUser?.image_icon) return;

      const icon = currentUser.image_icon;

      import(`../../assets/account-icon/${icon}.jpg`).then((module) => {
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
          bgColor='transparent'
          h={'54px'}
          px={{ base: '0px', md: '10px' }}
          py={{ base: '0px', md: '0px' }}
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
          <Avatar
            name={currentUser?.username}
            src={iconSrc}
            bg={'gray.300'}
            size={{ base: 'sm', md: 'md' }}
          />
          <Box
            fontWeight='bold'
            fontSize='lg'
            display={{ base: 'none', md: 'block' }}
          >
            {currentUser?.username}
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
          <MenuItem
            onClick={logout}
            isDisabled={isMutating}
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
    </>
  );
};
