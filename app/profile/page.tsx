import { getPostTime, getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainer';
import NoDataFound from '../components/NoDataFound';
import { Profile as UserProfile } from '../lib/definitions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    userid?: string;
    page?: string;
  };
}) {
  try {
    const profileUserId = Number(searchParams?.userid);
    const page = Number(searchParams?.page) || 1;
    const [profileData, userPostsData, userId] = await Promise.all([
      getProfile(profileUserId),
      getUserPosts(page, profileUserId),
      getUserId(),
    ]);

    if (!userPostsData?.userPosts || !userPostsData?.postsCount) {
      throw new Error('No data found');
    }

    const userPosts = await Promise.all(
      userPostsData.userPosts.map(async post => ({
        ...post,
        postTime: await getPostTime(post.createdAt).catch(() => 'Error calculating post time'),
      }))
    );

    const isAuthor = profileUserId === userId;

    return (
      <>
        <Profile profile={profileData as UserProfile} posts={userPosts} isAuthor={isAuthor} />
        <PaginationContainer page={page} timelinePostsCount={userPostsData.postsCount} />
      </>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
