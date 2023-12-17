import { Box, Skeleton, VStack, HStack, Avatar, SkeletonText, Center } from '@chakra-ui/react';

const Post = () => {
  return (
    <Center>
      <Box
        borderWidth="1px"
        borderRadius="md"
        padding={{ base: '20px' }}
        w={{ base: 300, sm: 430, md: 700, lg: 900, xl: 1200 }}
        boxShadow="md"
        mt={10}
      >
        <HStack alignItems={'flex-start'} justifyContent={'space-between'}>
          <VStack alignItems={'flex-start'}>
            <Skeleton height="50px" width="50px">
              <Avatar size={{ base: 'sm', sm: 'md' }} />
            </Skeleton>
            <SkeletonText mt="4" noOfLines={2} spacing="4" />
          </VStack>
          <Skeleton height="20px" width="20px" />
        </HStack>
        <SkeletonText mt="6" noOfLines={4} spacing="4" />
        <Skeleton height="500px" mt="6" />
        <HStack spacing={4} mt="6">
          <Skeleton height="20px" width="20px" />
          <Skeleton height="20px" width="100px" />
        </HStack>
      </Box>
    </Center>
  );
};

export default function Loading() {
  return (
    <>
      <Box mb={10}>
        <Post />
      </Box>
    </>
  );
}
