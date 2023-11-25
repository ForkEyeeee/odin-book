import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import { Suspense } from 'react';
import Loading from '../loading';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainerr';
import { Flex } from '@chakra-ui/react';

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

    if (timelinePosts.length <= 0) throw new Error();

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
        />
      </Suspense>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
