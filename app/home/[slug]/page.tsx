import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import prisma from '../../lib/prisma';
import { Friend } from '../../lib/definitions';
import TimeLineTabs from '../../components/TimeLineTabs';
import PaginationContainer from '../../components/PaginationContainer';
import { getPosts } from '@/app/lib/actions';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let page;
    if (page === '') page = '1';
    page = Number(params.slug);
    const {
      timelinePosts,
      otherTimeLinePosts,
      userId,
      timelinePostsCount,
      otherTimelinePostsCount,
    } = await getPosts(page);
    const take = 5;
    const startIndex = (page - 1) * take + 1;
    const endIndex = Math.min(startIndex + take - 1, timelinePostsCount);
    return (
      <div>
        <TimeLineTabs
          forYouPosts={timelinePosts}
          discoverPosts={otherTimeLinePosts}
          userId={userId}
        />
        <PaginationContainer
          page={page}
          currentCount={timelinePosts.length}
          timelinePostsCount={timelinePostsCount}
          otherTimelinePostsCount={otherTimelinePostsCount}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </div>
    );
  } catch (error) {
    return <div>Failed to Fetch Posts.</div>;
  }
}
