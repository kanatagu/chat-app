import { Flex } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { Sidebar, SpHeader } from '../components/layout';
import { MessagePanel } from '../components/message';
import { useIsMobile } from '../hooks/common/';
import { CustomSocket } from '../types';

const socket: CustomSocket = io('http://localhost:3000');

export const ChatPage = () => {
  const isMobile = useIsMobile();

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      p={{ base: '0px', md: '16px' }}
    >
      {isMobile ? <SpHeader /> : <Sidebar socket={socket} />}

      <MessagePanel socket={socket} />
    </Flex>
  );
};
