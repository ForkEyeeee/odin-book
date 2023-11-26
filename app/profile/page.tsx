import { getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainerr';
import NoDataFound from '../components/NoDataFound';
import NoProfile from '../components/NoProfile';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentUserId = await getUserId();
  const userId = Number(searchParams?.userid);
  const page = searchParams?.page || 1;
  try {
    if (userId === undefined) return;
    const profile = await getProfile(userId);
    if (profile === null) return <NoProfile />;
    const { userPosts, postsCount } = await getUserPosts(page, userId);
    const isAuthor = currentUserId === profile.userId;

    return (
      <>
        <Profile profile={profile} posts={userPosts} isAuthor={isAuthor} />
        <PaginationContainer page={page} timelinePostsCount={postsCount} />
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
