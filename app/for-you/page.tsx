import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts, getPostTime } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainer';
import NoTimeLine from '../components/NoTimeLine';
import PostList from '../components/PostList';
import { Box } from '@chakra-ui/react';
import { Post } from '../lib/definitions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    const page = Number(searchParams?.page) || 1;
    const { timelinePosts, userId, timelinePostsCount } = await getPosts(page);
    if (userId === undefined) throw new Error();

    await Promise.all(
      timelinePosts.map(async (post: Post) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );

    return (
      <Box>
        <TimeLineTabs />
        {timelinePostsCount > 0 ? (
          <>
            <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />

            <PostList forYouPosts={timelinePosts} userId={userId} />
          </>
        ) : (
          <NoTimeLine />
        )}
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
