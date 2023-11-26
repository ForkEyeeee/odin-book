'use client';
import { Box, Flex, Link } from '@chakra-ui/react';
import { Post } from './Post';
import { TimeLineTabsProps } from '../lib/definitions';
import { usePathname, useSearchParams } from 'next/navigation';

export function TimeLineTabs({ forYouPosts, discoverPosts, userId }: TimeLineTabsProps) {
  const pathname = usePathname();
  return (
    <>
      <Flex justifyContent="center" gap={50} p={4} mt={{ base: 3, sm: 5, md: 0 }} mb={{ base: 3 }}>
        <Link
          href={'/for-you?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
          fontWeight={pathname === '/for-you' ? 'bold' : 'initial'}
        >
          For You
        </Link>
        <Link
          href={'all-posts?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
          fontWeight={pathname === '/all-posts' ? 'bold' : 'initial'}
        >
          All Posts
        </Link>
      </Flex>

      <Box>
        {forYouPosts !== undefined &&
          forYouPosts.map((post, index) => (
            <Box key={post.id} mb={4}>
              <Post post={post} index={index} userId={userId} />
            </Box>
          ))}
      </Box>

      <Box mt={8}>
        {discoverPosts !== undefined &&
          discoverPosts.map((post, index) => (
            <Box key={post.id} mb={4}>
              <Post post={post} index={index} userId={userId} />
            </Box>
          ))}
      </Box>
    </>
  );
}

export default TimeLineTabs;
