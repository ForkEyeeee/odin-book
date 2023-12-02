import { getPostTime, getProfile, getUserId, getUserPosts } from '../lib/actions';
import Profile from '../components/Profile';
import PaginationContainer from '../components/PaginationContainer';
import NoDataFound from '../components/NoDataFound';
import { Profile as UserProfile } from '../lib/definitions';
import { Box } from '@chakra-ui/react';

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

    if (userPostsData?.userPosts === undefined || userPostsData?.postsCount === undefined)
      throw Error('No Data Found');

    const userPosts = await Promise.all(
      userPostsData.userPosts.map(async post => ({
        ...post,
        postTime: await getPostTime(post.createdAt).catch(() => 'Error calculating post time'),
      }))
    );

    const isAuthor = profileUserId === userId;

    return (
      <Box minH={'100vh'}>
        <Profile profile={profileData as UserProfile} posts={userPosts} isAuthor={isAuthor} />
        <PaginationContainer page={page} timelinePostsCount={userPostsData.postsCount} />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
