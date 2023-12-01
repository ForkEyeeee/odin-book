import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainer';
import NoTimeLine from '../components/NoTimeLine';
import PostList from '../components/PostList';
import { Box } from '@chakra-ui/react';
import { setReadMessages } from '@/app/lib/actions';

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
