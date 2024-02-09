import { useState, useEffect } from 'react';
import { Flex, Text, Avatar, Box } from '@chakra-ui/react';
import defaultIcon from '../../assets/account-icon/default.svg';

type MessageItemProps = {
  username: string;
  iconName: string;
  time: string;
  message: string;
};

export const MessageItem = ({
  username,
  iconName,
  time,
  message,
}: MessageItemProps) => {
  const [iconSrc, setIconSrc] = useState(defaultIcon);

  useEffect(() => {
    const fetchIcon = async () => {
      if (!iconName) return;

      import(`../../assets/account-icon/${iconName}.jpg`).then((module) => {
        console.log('module', module.default);
        setIconSrc(module.default);
      });
    };

    fetchIcon();
  });

  return (
    <Flex gap='10px'>
      <Avatar
        name={'John Doe'}
        src={iconSrc}
        bg={'gray.300'}
        size={{ base: 'sm', md: 'md' }}
      />
      <Box>
        <Flex gap='10px' align='center'>
          <Box fontWeight='bold' color={'purple.400'}>
            {username}
          </Box>
          <Text as='span' color={'gray.300'} fontSize='sm'>
            {time}
          </Text>
        </Flex>
        <Text>{message}</Text>
      </Box>
    </Flex>
  );
};
