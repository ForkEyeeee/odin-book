import { getProfile, getUserId, getUserPosts } from '../lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import Profile from '../components/Profile';
import ProfilePost from '../components/ProfilePost';
import PaginationContainer from '../components/PaginationContainer';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const userId = await getUserId();
  const page = searchParams?.page || '';
  try {
    if (userId === undefined) return;
    const profile = await getProfile(userId);
    if (profile === null) return;
    const { userPosts, postsCount } = await getUserPosts(page);
    return (
      <>
        <Profile profile={profile} posts={userPosts} />
        <PaginationContainer page={page} timelinePostsCount={postsCount} />
      </>
    );
  } catch (error) {
    return { message: `Unable to fetch profile` };
  }
}
