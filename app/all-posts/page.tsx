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
    const page = searchParams?.page || '';

    const { otherTimeLinePosts, userId, otherTimelinePostsCount } = await getPosts(page);

    return (
      <>
        <PaginationContainer page={page} timelinePostsCount={otherTimelinePostsCount} />
        <TimeLineTabs
          discoverPosts={otherTimeLinePosts}
          userId={userId}
          page={page}
          pageCountOtherTimelinePosts={otherTimeLinePosts.length} //total amount of records for current page
          otherTimelinePostsCount={otherTimelinePostsCount} //total amount of records
        />
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
