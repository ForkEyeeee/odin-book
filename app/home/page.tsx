import { getProfile } from '../lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import Profile from '../components/Profile';
import { getPosts } from '../lib/actions';
import TimeLineTabs from '../components/TimeLineTabs';
import PaginationContainer from '../components/PaginationContainer';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    let page;
    if (page === '') return;
    page = Number('1');
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
