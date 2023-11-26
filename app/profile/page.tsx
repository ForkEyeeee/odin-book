import { getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainerr';
import NoDataFound from '../components/NoDataFound';
import NoProfile from '../components/NoProfile';
import { Profile as UserProfile } from '../lib/definitions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    userid?: string;
    page?: string;
  };
}) {
  const currentUserId = await getUserId();
  const userId = Number(searchParams?.userid);
  const page = Number(searchParams?.page) || 1;
  try {
    if (userId === undefined) return;
    const profile = await getProfile(userId);
    if (profile === null) return <NoProfile />;
    const { userPosts, postsCount } = await getUserPosts(page, userId);
    if (postsCount === undefined) return;
    const isAuthor = currentUserId === (profile as UserProfile).userId;

    return (
      <>
        <Profile profile={profile as UserProfile} posts={userPosts} isAuthor={isAuthor} />
        <PaginationContainer page={page} timelinePostsCount={postsCount} />
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
