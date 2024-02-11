import { ErrorInfo } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../error';
import { useSetCurrentRoom } from '../../hooks/room';
import { useIsMobile } from '../../hooks/common';
import { Sidebar, SpHeader } from '.';

export const PrivateLayout = () => {
  const isMobile = useIsMobile();

  const onError = (error: Error, info: ErrorInfo) => {
    console.log('error.message', error.message);
    console.log('info.componentStack:', info.componentStack);
  };
  useSetCurrentRoom();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <Flex direction='column' minH='100vh' as='main'>
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent='space-between'
          p={{ base: '0px', md: '16px' }}
        >
          {isMobile ? <SpHeader /> : <Sidebar />}

          <Outlet />
        </Flex>
      </Flex>
    </ErrorBoundary>
  );
};
