import { Heading, VStack } from '@chakra-ui/react';
import { ProfileSetting } from '../components/profile';

export const ProfilePage = () => {
  return (
    <VStack
      w='100%'
      align='stretch'
      bgColor='gray.900'
      py={{ base: '10px', lg: '40px' }}
      px={{ base: '16px', lg: '80px' }}
      h={{ base: 'calc(100vh - 62px)', md: 'calc(100vh - 32px)' }}
    >
      <Heading as='h1'>Profile Setting</Heading>
      <ProfileSetting />
    </VStack>
  );
};
