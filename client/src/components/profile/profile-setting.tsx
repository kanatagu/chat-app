import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Box,
  Button,
  Input,
  useRadio,
  useRadioGroup,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import { iconImages } from '../../const';
import { useProfileSetting } from '../../hooks/profile';

export const ProfileSetting = () => {
  const {
    register,
    errors,
    setValue,
    getValues,
    onProfileSettingSubmit,
    isMutating,
  } = useProfileSetting();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'image_icon',
    defaultValue: getValues('image_icon') || 'default',
    onChange: (value) => setValue('image_icon', value),
  });

  const group = getRootProps();

  return (
    <VStack
      bgColor={{ base: 'gray.900', md: 'gray.800' }}
      flexGrow={1}
      p={{ base: '0px', md: '40px' }}
      mt='20px'
    >
      <form onSubmit={onProfileSettingSubmit}>
        <VStack spacing={{ base: '20px', md: '30px' }}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              placeholder='username'
              {...register('username')}
            />
            <FormErrorMessage>{errors?.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.image_icon}>
            <FormLabel>Icon</FormLabel>
            <HStack {...group} flexWrap='wrap' gap='18px'>
              {iconImages.map((icon) => {
                const radio = getRadioProps({ value: icon.name });
                return (
                  <RadioItem key={icon.name} {...radio}>
                    <Avatar
                      name={icon.name}
                      src={icon.url}
                      bg={'gray.300'}
                      size={{ base: 'sm', md: 'md' }}
                    />
                  </RadioItem>
                );
              })}
            </HStack>
            <FormErrorMessage>{errors?.image_icon?.message}</FormErrorMessage>
          </FormControl>
        </VStack>

        <Box textAlign='center' mt={{ base: '40px', md: '80px' }}>
          <Button
            colorScheme='purple'
            size='md'
            type='submit'
            isLoading={isMutating}
          >
            Update Profile
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

const RadioItem = ({ children, ...rest }: { children: React.ReactNode }) => {
  const { getInputProps, getRadioProps } = useRadio(rest);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...radio}
        cursor='pointer'
        borderWidth='3px'
        borderRadius='md'
        boxShadow='md'
        px={{ base: '8px', md: '12px' }}
        py={{ base: '8px', md: '12px' }}
        _checked={{
          bg: 'gray.700',
          borderColor: 'purple.500',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
