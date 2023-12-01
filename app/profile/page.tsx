import { getPostTime, getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainer';
import NoDataFound from '../components/NoDataFound';
import NoProfile from '../components/NoProfile';
import { Post, Profile as UserProfile } from '../lib/definitions';

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

    await Promise.all(
      userPosts.map(async (post: Post) => {
        try {
          const test = await getPostTime(post.createdAt);
          post.postTime = test;
        } catch (error) {
          return { message: 'Error calculating post time' };
        }
      })
    );

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
