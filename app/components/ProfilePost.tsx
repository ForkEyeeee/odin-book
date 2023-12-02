import { Box, VStack, Text, LinkBox, LinkOverlay, Heading, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { Post } from '../lib/definitions';
import Link from 'next/link';
import { Suspense } from 'react';
import ProfilePostsSkeleton from '../profile/loading';

interface ProfilePostsProps {
  posts: Post[] | undefined;
}

export default function ProfilePosts({ posts }: ProfilePostsProps) {
  return (
    <>
      <Heading fontSize={{ base: 'lg' }} mb={4}>
        User Posts
      </Heading>
      {posts !== undefined && posts.length > 0 ? (
        <Suspense fallback={<ProfilePostsSkeleton />}>
          <Box>
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
                    zIndex={0}
                  >
                    {post.imageUrl && (
                      <Box position={'relative'} borderRadius="md" overflow="hidden" zIndex={2}>
                        <Image
                          src={`${post.imageUrl}`}
                          alt={`Post image ${post.id}`}
                          height={500}
                          width={700}
                          sizes="100vw"
                          quality={100}
                          placeholder={post.blurURL !== null ? 'blur' : 'empty'}
                          blurDataURL={post.blurURL !== null ? post.blurURL : ''}
                          priority
                        />
                      </Box>
                    )}
                    <VStack align="stretch" p="4">
                      <Text fontSize="lg" fontWeight="bold" color="white">
                        {post.content}
                      </Text>
                      <Text color="gray.400" fontSize="sm">
                        {post.postTime}
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
        </Suspense>
      ) : (
        <Flex mt={10} fontSize={'xl'} justifyContent={'center'}>
          <Text>Sorry, you haven&apos;t created any posts! 😥</Text>
        </Flex>
      )}
    </>
  );
}
