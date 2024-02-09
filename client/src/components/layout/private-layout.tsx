import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuthStore, useFriendlyForwardingStore } from '../../store';
import { ErrorFallback } from '../error';
import { ErrorInfo } from 'react';

export const PrivateLayout = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const redirectTo = useFriendlyForwardingStore((state) => state.redirectTo);

  if (!currentUser && redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  const onError = (error: Error, info: ErrorInfo) => {
    console.log('error.message', error.message);
    console.log('info.componentStack:', info.componentStack);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <Flex direction='column' minH='100vh'>
        <Outlet />
      </Flex>
    </ErrorBoundary>
  );
};
