import { Navigate, Outlet } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import { useAuthContext } from '../../providers';

export const PrivateLayout = () => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to='/login' />;
  }

  return (
    <Flex direction='column' align='center' justify='center' minH='100vh'>
      <Box>Header</Box>
      <Outlet />
    </Flex>
  );
};
