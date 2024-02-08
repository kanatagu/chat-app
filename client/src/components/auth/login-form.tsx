import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Box,
  Button,
  Input,
} from '@chakra-ui/react';
import { useLogin } from '../../hooks/auth';
import { InputPassword } from '../ui';

export const LoginForm = () => {
  const { register, errors, onLoginSubmit, isMutating } = useLogin();

  return (
    <Box as='form' onSubmit={onLoginSubmit}>
      <VStack spacing='20px'>
        <FormControl isInvalid={!!errors.username}>
          <FormLabel>Username</FormLabel>
          <Input type='text' placeholder='username' {...register('username')} />
          <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <InputPassword {...register('password')} />
          <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
        </FormControl>
      </VStack>

      <Box textAlign='center' mt='38px'>
        <Button
          colorScheme='purple'
          size='lg'
          type='submit'
          isLoading={isMutating}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
