import { Spinner, AbsoluteCenter, Flex } from '@chakra-ui/react';

const ChatSkeleton = () => {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} h={'100vh'}>
      <Spinner size={'xl'} />
    </Flex>
  );
};

export default ChatSkeleton;
