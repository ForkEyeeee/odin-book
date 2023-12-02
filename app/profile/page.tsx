import { getPostTime, getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainer';
import NoDataFound from '../components/NoDataFound';
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
    const promise1 = getProfile(userId);
    const promise2 = getUserPosts(page, userId);

    const allPromise = Promise.all([promise1, promise2]);

    const [profile, { userPosts, postsCount }] = await allPromise;

    if (userPosts === undefined || postsCount === undefined) throw new Error();

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

    const isAuthor = currentUserId === (profile as UserProfile).userId;

    return (
      <>
        <Profile profile={profile as UserProfile} posts={userPosts} isAuthor={isAuthor} />
        <PaginationContainer page={page} timelinePostsCount={postsCount} />
      </>
    );
  } catch (error) {
    console.error(error);
    return <NoDataFound />;
  }
}
