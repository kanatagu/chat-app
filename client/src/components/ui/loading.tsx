import { Flex, Spinner } from '@chakra-ui/react';

export const Loading = () => {
  return (
    <Flex align='center' justify='center' flexDir='column' py='140px'>
      <Spinner
        thickness='6px'
        speed='0.65s'
        emptyColor='gray.200'
        color='purple.500'
        size='xl'
      />
    </Flex>
  );
};
