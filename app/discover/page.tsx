import TimeLineTabs from '../components/TimeLineTabs';
import PaginationContainer from '../components/PaginationContainerr';
import { getPosts } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PostList from '../components/PostList';
import NoTimeLine from '../components/NoTimeLine';
import { Box } from '@chakra-ui/react';

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
    if (userId === undefined) return;
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
