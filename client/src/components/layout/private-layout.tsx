import { ErrorInfo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../error';
import { useSetCurrentRoom } from '../../hooks/room';
import { useIsMobile } from '../../hooks/common';
import { Sidebar, SpHeader } from '.';
import { useJoinedRoomsStore } from '../../store';

export const PrivateLayout = () => {
  const isMobile = useIsMobile();
  const getUserJoinedRooms = useJoinedRoomsStore(
    (state) => state.getUserJoinedRooms
  );

  useEffect(() => {
    getUserJoinedRooms();
  }, [getUserJoinedRooms]);

  useSetCurrentRoom();

  const onError = (error: Error, info: ErrorInfo) => {
    console.error('error.message', error.message);
    console.error('info.componentStack:', info.componentStack);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      <Flex direction='column' minH='100vh' as='main' bgColor='gray.900'>
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
