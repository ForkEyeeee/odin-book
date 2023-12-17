import NoDataFound from '../components/NoDataFound';
import { Box } from '@chakra-ui/react';
import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import LoadMoreDiscover from '../components/LoadMoreDiscover';

export default async function Page() {
  try {
    const { otherTimeLinePosts, otherTimelinePostsCount } = (await getPosts(1)) ?? [];

    if (otherTimeLinePosts === undefined || otherTimeLinePosts.length === 0) return;

    await Promise.allSettled(
      otherTimeLinePosts.map(async (post: PostWithAuthor) => {
        try {
          const time = await getPostTime(post.createdAt);
          post.postTime = time;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );
    return (
      <Box minHeight="100vh">
        <TimeLineTabs />
        <LoadMoreDiscover
          initialPosts={otherTimeLinePosts}
          otherTimelinePostsCount={otherTimelinePostsCount}
        />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
