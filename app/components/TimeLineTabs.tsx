import { Box, Flex, Link } from '@chakra-ui/react';
import { Post } from './Post';
import { TimeLineTabsProps } from '../lib/definitions';

export function TimeLineTabs({ forYouPosts, discoverPosts, userId }: TimeLineTabsProps) {
  return (
    <>
      <Flex justifyContent="space-around" p={4}>
        <Link
          href={'/for-you?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
        >
          For You
        </Link>
        <Link
          href={'all-posts?page=1'}
          color="blue.600"
          _hover={{ textDecoration: 'underline', bg: 'gray.100' }}
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
