import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast, useBoolean } from '@chakra-ui/react';
import { authSchema, AuthSchemaType } from '../../schema';
import { registerApi } from '../../api/auth';
import { isErrorWithMessage } from '../../utils';
import { useAuthStore } from '../../store';

export const useRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const [isMutating, setIsMutating] = useBoolean();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(authSchema),
  });

  const registerAccount = async (data: AuthSchemaType) => {
    try {
      setIsMutating.on();

      const res = await registerApi({
        username: data.username,
        password: data.password,
      });

      setCurrentUser(res.data);

      setIsMutating.off();
      navigate('/');
    } catch (error) {
      let errorMessage = 'Sorry, error has occurred. Try again later.';

      if (isErrorWithMessage(error)) {
        errorMessage = error.response?.data.message || errorMessage;
      }

      toast({
        position: 'top',
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsMutating.off();
    }
  };

  return {
    register,
    onRegisterSubmit: handleSubmit(registerAccount),
    errors,
    isMutating,
  };
};
