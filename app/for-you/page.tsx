import TimeLineTabs from '../components/TimeLineTabs';
import { getPosts } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';
import PaginationContainer from '../components/PaginationContainer';
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
      <>
        <TimeLineTabs />
        {timelinePostsCount > 0 ? (
          <>
            <PaginationContainer page={page} timelinePostsCount={timelinePostsCount} />

            <PostList forYouPosts={timelinePosts} userId={userId} />
          </>
        ) : (
          <NoTimeLine />
        )}
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
