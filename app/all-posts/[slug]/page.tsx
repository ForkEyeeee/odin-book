import TimeLineTabs from '../../components/TimeLineTabs';
import PaginationContainer from '../../components/PaginationContainer';
import { getPosts } from '@/app/lib/actions';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let page;
    if (params.slug === null) {
      page = 1;
    } else {
      page = Number(params.slug);
    }
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
        ></TimeLineTabs>
      </>
    );
  } catch (error) {
    return <div>Failed to Fetch Posts.</div>;
  }
}
