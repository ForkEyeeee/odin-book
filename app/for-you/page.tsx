import NoDataFound from '../components/NoDataFound';
import { Box } from '@chakra-ui/react';
import LoadMoreForYou from '../components/LoadMoreForYou';
import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts, getPostTime } from '../lib/actions';
import { PostWithAuthor } from '../lib/definitions';
import NoTimeLine from '../components/NoTimeLine';

export default async function Page() {
  try {
    const { timelinePosts, timelinePostsCount } = (await getPosts(1)) ?? [];

    if (timelinePosts === undefined || timelinePosts.length === 0) {
      return <Box minHeight="100vh"><TimeLineTabs /><NoTimeLine/></Box>
    } 


    await Promise.allSettled(
      timelinePosts.map(async (post: PostWithAuthor) => {
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
        <LoadMoreForYou initialPosts={timelinePosts} timelinePostsCount={timelinePostsCount} />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
