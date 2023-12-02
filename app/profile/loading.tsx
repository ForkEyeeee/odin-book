import { Box, VStack, Skeleton, SkeletonText, Container } from '@chakra-ui/react';

export default function ProfileSkeleton() {
  return (
    <Container maxW="container.md" mt={10} h={'100%'}>
      <Box display={'flex'}>
        <VStack alignItems={'flex-start'} w={'100%'} spacing={5}>
          <Skeleton height="20px" width="200px" />
          <SkeletonText mt="4" noOfLines={3} spacing="4" />
        </VStack>
      </Box>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} mb={10} mt={5} width="100%">
        <VStack spacing={4} align="stretch">
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </VStack>
      </Box>

      <Box mb={5}>
        <Skeleton height="20px" width="200px" />
        <VStack spacing={10} align="stretch">
          {Array(5)
            .fill('')
            .map((_, index) => (
              <Skeleton key={index} height="120px" mt="4" />
            ))}
        </VStack>
      </Box>
    </Container>
  );
}
