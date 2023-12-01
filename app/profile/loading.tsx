'use client';
import { Box, VStack, Heading, Skeleton, SkeletonText } from '@chakra-ui/react';

export default function ProfilePostsSkeleton() {
  return (
    <Box>
      <Heading fontSize={{ base: 'lg' }} mb={4}>
        <Skeleton height="20px" width="150px" />
      </Heading>
      <VStack spacing={4} align="stretch">
        {[...Array(5)].map((_, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            padding="4"
            width="100%"
            boxShadow="lg"
            mt="4"
            bg="gray.700"
          >
            <Skeleton height="200px" borderRadius="md" />
            <VStack align="stretch" p="4">
              <SkeletonText mt="4" noOfLines={2} spacing="4" />
              <Skeleton height="15px" width="100px" />
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
