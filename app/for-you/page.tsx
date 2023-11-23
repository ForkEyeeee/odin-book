import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import { Suspense } from 'react';
import { Box } from '@chakra-ui/react';
import Loading from '../loading';
import PaginationContainer from '../components/PaginationContainerr';
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    const page = searchParams?.page || '';
    const { timelinePosts, userId, timelinePostsCount } = await getPosts(page);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const take = 5;
    const startIndex = (page - 1) * take + 1;
    const endIndex = Math.min(startIndex + take - 1, timelinePostsCount);

    return (
      <Suspense fallback={<Loading />}>
        <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />
        <TimeLineTabs
          forYouPosts={timelinePosts}
          userId={userId}
          page={page}
          pageCountTimelinePosts={timelinePosts.length}
          timelinePostsCount={timelinePostsCount}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </Suspense>
    );
  } catch (error) {
    return <div>Failed to Fetch Posts.</div>;
  }
}
