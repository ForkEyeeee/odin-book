'use client';
// UserPostSkeleton.js
import { Box, Flex, SkeletonCircle, SkeletonText, Spacer, Stack } from '@chakra-ui/react';

export default function UserPostSkeleton() {
  return (
    <>
      <Box borderWidth="1px" borderRadius="md" padding="20px" width="500px" boxShadow="md">
        <Flex>
          <SkeletonCircle size="10" />
          <Box ml="4">
            <SkeletonText mt="4" noOfLines={1} width="20" />
            <SkeletonText mt="1" noOfLines={1} width="40" />
          </Box>
          <Spacer />
          <SkeletonText mt="4" noOfLines={1} width="10" />
        </Flex>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
      <Box borderWidth="1px" borderRadius="md" padding="20px" width="500px" boxShadow="md">
        <Flex>
          <SkeletonCircle size="10" />
          <Box ml="4">
            <SkeletonText mt="4" noOfLines={1} width="20" />
            <SkeletonText mt="1" noOfLines={1} width="40" />
          </Box>
          <Spacer />
          <SkeletonText mt="4" noOfLines={1} width="10" />
        </Flex>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>{' '}
      <Box borderWidth="1px" borderRadius="md" padding="20px" width="500px" boxShadow="md">
        <Flex>
          <SkeletonCircle size="10" />
          <Box ml="4">
            <SkeletonText mt="4" noOfLines={1} width="20" />
            <SkeletonText mt="1" noOfLines={1} width="40" />
          </Box>
          <Spacer />
          <SkeletonText mt="4" noOfLines={1} width="10" />
        </Flex>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </>
  );
}
