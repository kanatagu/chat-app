import { ErrorInfo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthStore } from '../../store';
import { ErrorFallback } from '../error';

export const PublicLayout = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser) {
    return <Navigate to='/' />;
  }

  const onError = (error: Error, info: ErrorInfo) => {
    console.log('error.message', error.message);
    console.log('info.componentStack:', info.componentStack);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <Flex direction='column' align='center' justify='center' h='100vh'>
        <Outlet />
      </Flex>
    </ErrorBoundary>
  );
};
