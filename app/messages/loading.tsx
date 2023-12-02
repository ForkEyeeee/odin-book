import { Box, Skeleton, SkeletonCircle, HStack } from '@chakra-ui/react';

const ChatSkeleton = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      h={{ base: '92.5vh', xl: '93.5vh' }}
      overflowY={'scroll'}
    >
      <Box p={{ xl: 5 }} bg="inherit">
        <HStack justifyContent={'flex-start'} p={2}>
          <SkeletonCircle size="40px" />
          <Skeleton height="20px" width="120px" ml="4" />
        </HStack>
      </Box>
    </Box>
  );
};

export default ChatSkeleton;
