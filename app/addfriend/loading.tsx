'use client';
import { Skeleton, VStack, ListItem, UnorderedList, Box, HStack, Center } from '@chakra-ui/react';

const SearchBoxAndFriendsListSkeleton = () => {
  return (
    <Center mt={0} mb={10} alignItems={'flex-start'}>
      <VStack align="stretch" spacing={4}>
        <Box
          p={3}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="sm"
          minW={{ sm: 380, md: 600, lg: 800, xl: 1000 }}
          maxW={{ base: 300, sm: 'initial' }}
        >
          <HStack justifyContent="space-between" alignItems="center">
            <Skeleton
              startColor="gray.100"
              endColor="gray.200"
              height="20px"
              width="75%"
              borderRadius="md"
            />
          </HStack>
        </Box>

        <UnorderedList styleType="none" ml={0}>
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <ListItem
                key={index}
                p={3}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                mt={index > 0 ? '15px' : 0}
                minW={{ sm: 380, md: 600, lg: 800, xl: 1000 }}
                maxW={{ base: 300, sm: 'initial' }}
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <Skeleton
                    startColor="gray.100"
                    endColor="gray.200"
                    height="50px"
                    width="50px"
                    borderRadius="full"
                  />
                  <Box flex="1" ml={3}>
                    <Skeleton startColor="gray.100" endColor="gray.200" height="20px" width="75%" />
                    <Skeleton
                      startColor="gray.100"
                      endColor="gray.200"
                      height="15px"
                      width="50%"
                      mt={2}
                    />
                  </Box>
                  <HStack spacing={4}>
                    <Skeleton
                      startColor="gray.100"
                      endColor="gray.200"
                      height="20px"
                      width="20px"
                      borderRadius="md"
                    />
                    <Skeleton
                      startColor="gray.100"
                      endColor="gray.200"
                      height="20px"
                      width="20px"
                      borderRadius="md"
                    />
                  </HStack>
                </HStack>
              </ListItem>
            ))}
        </UnorderedList>
      </VStack>
    </Center>
  );
};

export default SearchBoxAndFriendsListSkeleton;
