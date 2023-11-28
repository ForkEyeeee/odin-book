import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import { Suspense } from 'react';
import Loading from '../loading';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainerr';
import NoTimeLine from '../components/NoTimeLine';
import PostList from '../components/PostList';

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
      <Suspense fallback={<Loading />}>
        <TimeLineTabs />
        {timelinePostsCount > 0 ? (
          <>
            <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />
            <PostList forYouPosts={timelinePosts} userId={userId} />
          </>
        ) : (
          <NoTimeLine />
        )}
      </Suspense>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
