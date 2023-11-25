import { Box, VStack, Text, LinkBox, LinkOverlay, Heading } from '@chakra-ui/react';
import Image from 'next/image';
import { PostProps } from '../lib/definitions';
import { format } from 'date-fns';
import Link from 'next/link';

export default function ProfilePosts({ posts }: PostProps) {
  return (
    <Box>
      <Heading fontSize={{ base: 'lg' }} mb={4}>
        User Posts
      </Heading>
      <VStack spacing={4} align="stretch">
        {posts?.map(post => (
          <Link href={`/posts/${post.id}`} passHref key={post.id}>
            <LinkBox
              as="article"
              borderWidth="1px"
              borderRadius="lg"
              padding="4"
              width="100%"
              boxShadow="lg"
              mt="4"
              bg="gray.700"
              _hover={{ bg: 'gray.600', transition: 'background 0.3s' }}
              position="relative"
              cursor="pointer"
            >
              {post.imageUrl && (
                <Box
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                  width="100%"
                  height="auto"
                >
                  <Image
                    src={post.imageUrl}
                    alt={`Post image ${post.id}`}
                    layout="responsive"
                    width={0}
                    height={0}
                    objectFit="contain"
                    unoptimized
                  />
                </Box>
              )}
              <VStack align="stretch" p="4">
                <Text fontSize="lg" fontWeight="bold" color="white">
                  {post.content}
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {format(new Date(post.createdAt), 'PPpp')}
                </Text>
              </VStack>
              <LinkOverlay
                href={`/posts/${post.id}`}
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                left={0}
                zIndex={-1}
              />
            </LinkBox>
          </Link>
        ))}
      </VStack>
    </Box>
  );
}
