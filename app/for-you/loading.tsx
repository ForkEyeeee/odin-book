import {
  Box,
  Skeleton,
  VStack,
  HStack,
  Avatar,
  SkeletonText,
  Center,
  Container,
  Flex,
} from '@chakra-ui/react';

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
      <Container p={{ base: 5, sm: 8 }} pt={{ base: 3 }} borderRadius="lg" mt={10}>
        <Flex flexDirection={{ base: 'column' }} alignItems={'center'}>
          <Box>
            <Skeleton height="20px" width="200px" />
          </Box>
          <Skeleton height="20px" width="300px" mt="4" />
        </Flex>
      </Container>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  );
}
