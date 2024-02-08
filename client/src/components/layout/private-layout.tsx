import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useAuthContext } from '../../providers';

export const PrivateLayout = () => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <Flex direction='column' minH='100vh'>
      <Outlet />
    </Flex>
  );
};
