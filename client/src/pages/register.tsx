import {
  Flex,
  Heading,
  Box,
  Link as ChakraLink,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { RegisterForm } from '../components/auth';
import { FiCoffee } from 'react-icons/fi';

export const RegisterPage = () => {
  return (
    <Flex
      flexDir='column'
      justify='center'
      align='center'
      mx='auto'
      w={{ base: '100%', md: '480px' }}
    >
      <Box
        bgColor={{ md: 'gray.700' }}
        p={{ base: '16px', md: '40px' }}
        w='100%'
        h={{ base: '100%', md: 'auto' }}
      >
        <Flex
          fontSize='2xl'
          fontWeight='700'
          color='purple.400'
          alignItems='center'
          justifyContent='center'
          gap='8px'
          w='full'
        >
          <FiCoffee />
          Dev Chat
        </Flex>
        <Heading textAlign='center' mt='20px' fontSize='3xl'>
          Create Your Account
        </Heading>
        <Box mt={{ base: '30px', md: '40px' }}>
          <RegisterForm />
        </Box>
        <VStack mt={{ base: '40px', md: '40px' }} color='gray.400' gap='4px'>
          <Text as='span'>Already have an account?</Text>
          <ChakraLink as={ReactRouterLink} to='/login' color='purple.400'>
            Login
          </ChakraLink>
        </VStack>
      </Box>
    </Flex>
  );
};
