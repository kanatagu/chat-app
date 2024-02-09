import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Container,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';

export const ErrorNotFound = () => {
  return (
    <Container maxW={{ base: '100%', lg: 'container.lg' }} h='100vh'>
      <VStack justify='center' align='center' gap='30px' h='100%'>
        <Heading as='h1'>Oops!</Heading>
        <Text fontSize='xl'>404 Not Found.</Text>
        <ChakraLink
          as={ReactRouterLink}
          to={'/'}
          fontSize='xl'
          color='purple.400'
          _hover={{ color: 'purple.300' }}
        >
          Go To Top
        </ChakraLink>
      </VStack>
    </Container>
  );
};
