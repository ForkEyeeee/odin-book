import { Box } from '@chakra-ui/react';
import { Post } from './Post';
import { TimeLineTabsProps } from '../lib/definitions';

export default function PostList({ forYouPosts, discoverPosts, userId }: TimeLineTabsProps) {
  return (
    <>
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
