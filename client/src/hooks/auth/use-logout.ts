import { useNavigate } from 'react-router-dom';
import { useToast, useBoolean } from '@chakra-ui/react';
import { logoutApi } from '../../api/auth';
import { useAuthContext } from '../../providers';
import { isErrorWithMessage } from '../../utils';

export const useLogout = () => {
  const navigate = useNavigate();
  const [isMutating, setIsMutating] = useBoolean();
  const toast = useToast();
  const { setCurrentUser } = useAuthContext();

  const logout = async () => {
    try {
      setIsMutating.on();

      await logoutApi();
      setCurrentUser(null);
      navigate('/login');
      setIsMutating.off();
    } catch (error) {
      let errorMessage = 'Sorry, error has occurred. Try again later.';

      if (isErrorWithMessage(error)) {
        errorMessage = error.response?.data
          ? error.response.data
          : errorMessage;
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

  return { logout, isMutating };
};
