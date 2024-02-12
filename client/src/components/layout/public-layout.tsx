import { ErrorInfo } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../error';

export const PublicLayout = () => {
  const onError = (error: Error, info: ErrorInfo) => {
    console.error('error.message', error.message);
    console.error('info.componentStack:', info.componentStack);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <Flex
        direction='column'
        align='center'
        justify='center'
        h='100vh'
        as='main'
      >
        <Outlet />
      </Flex>
    </ErrorBoundary>
  );
};
