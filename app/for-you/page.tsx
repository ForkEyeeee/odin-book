import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts, getPostTime } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainer';
import NoTimeLine from '../components/NoTimeLine';
import PostList from '../components/PostList';
import { Box } from '@chakra-ui/react';
import { Post } from '../lib/definitions';
import LoadMore from '../components/load-more';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    return (
      <LoadMore />

      // <Box>
      //   <TimeLineTabs />
      //   {timelinePostsCount > 0 ? (
      //     <>
      //       {/* <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} /> */}
      //       {/* <PostList forYouPosts={timelinePosts} userId={userId} /> */}
      //     </>
      //   ) : (
      //     <NoTimeLine />
      //   )}
      // </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
