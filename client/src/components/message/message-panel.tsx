import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHash } from 'react-icons/fi';
import { MessageItem, MessageInput } from './index';
import { RoomDetailsModal } from '../room';

const dummyMessages = [
  {
    username: 'John Doe',
    iconName: 'orange',
    time: 'Today at 4:00 AM',
    message: 'Hello everyone!',
  },
  {
    username: 'Chris Evans',
    iconName: 'ninja',
    time: 'Today at 8:00 AM',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum saepe tempore ea dignissimos repellendus vel dolor placeat sit laudantium molestias fugiat veniam nihil quod harum distinctio repudiandae ut corporis!',
  },
  {
    username: 'Mike Tyson',
    iconName: '',
    time: 'Today at 10:00 AM',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum saepe tempore ea dignissimos repellendus vel dolor placeat sit laudantium molestias fugiat veniam nihil quod harum distinctio repudiandae ut corporis!',
  },
  {
    username: 'John Lennon',
    iconName: '',
    time: 'Today at 11:00 AM',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum saepe tempore ea dignissimos repellendus vel dolor placeat sit laudantium molestias fugiat veniam nihil quod harum distinctio repudiandae ut corporis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, voluptatum saepe tempore ea dignissimos repellendus vel dolor placeat sit laudantium molestias fugiat veniam nihil quod harum distinctio repudiandae ut corporis!',
  },
];

export const MessagePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        w='100%'
        bgColor='gray.700'
        h={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 32px)' }}
        align='stretch'
        justify='space-between'
      >
        <Box
          py={{ base: '10px', md: '10px' }}
          px={{ base: '16px', md: '20px' }}
        >
          <Flex
            align='end'
            gap='10px'
            onClick={onOpen}
            cursor='pointer'
            _hover={{
              opacity: '.8',
            }}
            borderBottom='1px solid'
            borderColor='gray.600'
            pb='10px'
          >
            <Heading
              as='h1'
              display='flex'
              alignItems='center'
              fontSize={{ base: 'lg', md: '2xl' }}
              gap='4px'
            >
              <Text as='span' fontSize='sm' w={{ base: '16px', md: '20px' }}>
                <FiHash size={'100%'} />
              </Text>
              JavaScript
            </Heading>
            <Text
              color='gray.400'
              display={'-webkit-box'}
              overflow={'hidden'}
              sx={{
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: '1',
              }}
              fontSize={'sm'}
            >
              This is description! This is description! This is description!
              This is description! This is description! This is description!
              This is description! This is description! This is description!
              This is description!
            </Text>
          </Flex>

          <VStack
            align='start'
            gap='28px'
            mt={{ base: '10px', md: '16px' }}
            overflowY='auto'
            maxH={{ base: 'calc(100vh - 189px)', md: 'calc(100vh - 177px)' }}
          >
            {dummyMessages.map((message, index) => (
              <MessageItem
                key={index}
                username={message.username}
                iconName={message.iconName}
                time={message.time}
                message={message.message}
              />
            ))}
          </VStack>
        </Box>

        <MessageInput />
      </VStack>

      <RoomDetailsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
