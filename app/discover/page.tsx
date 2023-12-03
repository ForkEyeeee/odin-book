import TimeLineTabs from '../components/TimeLineTabs';
import PaginationContainer from '../components/PaginationContainer';
import { getPosts, getPostTime } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PostList from '../components/PostList';
import NoTimeLine from '../components/NoTimeLine';
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

    const { otherTimeLinePosts, userId, otherTimelinePostsCount } = await getPosts(page);
    if (userId === undefined) return <NoDataFound />;

    await Promise.allSettled(
      otherTimeLinePosts.map(async (post: Post) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );

    return (
      <Box mt={0}>
        <TimeLineTabs />
        {otherTimelinePostsCount > 0 ? (
          <>
            <PaginationContainer page={page} timelinePostsCount={otherTimelinePostsCount} />
            <PostList forYouPosts={otherTimeLinePosts} userId={userId} />
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
