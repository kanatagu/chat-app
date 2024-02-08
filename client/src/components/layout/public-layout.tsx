import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { useAuthContext } from '../../providers';

export const PublicLayout = () => {
  const { currentUser } = useAuthContext();

  if (currentUser) {
    return <Navigate to='/' />;
  }
  return (
    <Flex direction='column' align='center' justify='center' h='100vh'>
      <Outlet />
    </Flex>
  );
};
