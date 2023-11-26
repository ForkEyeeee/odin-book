import TimeLineTabs from '../components/TimeLineTabs';
import PaginationContainer from '../components/PaginationContainerr';
import { getPosts } from '@/app/lib/actions';
import NoDataFound from '../components/NoDataFound';

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
      <>
        <PaginationContainer page={page} timelinePostsCount={otherTimelinePostsCount} />
        <TimeLineTabs discoverPosts={otherTimeLinePosts} userId={userId} />
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
