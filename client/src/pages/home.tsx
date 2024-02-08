import { Flex } from '@chakra-ui/react';
import { Sidebar, SpHeader } from '../components/layout';
import { MessagePanel } from '../components/message';
import { useIsMobile } from '../hooks/common/';

export const HomePage = () => {
  const isMobile = useIsMobile();
  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent='space-between'
      p={{ base: '0px', md: '16px' }}
    >
      {isMobile ? <SpHeader /> : <Sidebar />}

      <MessagePanel />
    </Flex>
  );
};
