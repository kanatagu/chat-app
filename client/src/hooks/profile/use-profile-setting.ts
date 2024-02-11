import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast, useBoolean } from '@chakra-ui/react';
import { profileSchema, ProfileSchemaType } from '../../schema';
import { isErrorWithMessage } from '../../utils';
import { useAuthStore } from '../../store';
import { updateUserApi } from '../../api/user';

export const useProfileSetting = () => {
  const toast = useToast();
  const [isMutating, setIsMutating] = useBoolean();
  const currentUser = useAuthStore((state) => state.currentUser);
  const getUser = useAuthStore((state) => state.getUser);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: currentUser?.username,
      image_icon: currentUser?.image_icon,
    },
  });

  const profileUpdate = async (data: ProfileSchemaType) => {
    console.log('submit!', data);

    try {
      setIsMutating.on();
      await updateUserApi({
        username: data.username,
        image_icon: data.image_icon,
      });

      await getUser();
      toast({
        position: 'top',
        title: 'Successfully updated!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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
    errors,
    setValue,
    getValues,
    onProfileSettingSubmit: handleSubmit(profileUpdate),
    isMutating,
  };
};
