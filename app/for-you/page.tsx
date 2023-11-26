import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import { Suspense } from 'react';
import Loading from '../loading';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainerr';
import ScrollToTop from '../components/ScrollToTop';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    const page = Number(searchParams?.page);
    const { timelinePosts, userId, timelinePostsCount } = await getPosts(page);
    if (userId === undefined) throw new Error();

    await new Promise(resolve => setTimeout(resolve, 2000));

    return (
      <Suspense fallback={<Loading />}>
        <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />
        <TimeLineTabs forYouPosts={timelinePosts} userId={userId} />
      </Suspense>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
