import { Box, VStack, Checkbox, Flex, Text, Heading } from '@chakra-ui/react';
import { FiHash } from 'react-icons/fi';
import { useAllRooms, useJoinRoomMutation } from '../../hooks/room';
import { Loading } from '../ui';

export const AllRooms = () => {
  const { allRooms, isLoading } = useAllRooms();
  const { onChangeHandler, isMutating, joinedRooms } = useJoinRoomMutation();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack
      align='stretch'
      gap='20px'
      maxH={{ base: 'auto', md: 'calc(100vh - 176px)' }}
      overflow='auto'
      mb={{ base: '40px', md: '0px' }}
      pr={{ base: '0', md: '8px' }}
    >
      {allRooms.map((room) => (
        <Flex
          key={room.id}
          align='center'
          justify='space-between'
          borderBottom='1px solid'
          borderColor='gray.600'
          pb='12px'
          px='16px'
          gap='10px'
        >
          <Box color='gray.400'>
            <Heading
              as='h2'
              fontSize={{ base: 'lg', md: 'xl' }}
              display='flex'
              alignItems='center'
              gap='4px'
            >
              <FiHash size={16} />
              {room.name}
            </Heading>
            <Text fontSize={{ base: 'sm', md: 'md' }} mt='4px'>
              {room.description}
            </Text>
          </Box>

          <Checkbox
            size='xl'
            colorScheme='purple'
            isDisabled={isMutating}
            isChecked={joinedRooms.some((jr) => jr.id === room.id)}
            onChange={() => onChangeHandler(room.id)}
          />
        </Flex>
      ))}
    </VStack>
  );
};
