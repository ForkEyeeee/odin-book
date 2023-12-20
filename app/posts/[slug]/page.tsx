import { Post } from '@/app/components/Post';
import { getPost, getUser, getUserId } from '@/app/lib/actions';
import NoDataFound from '@/app/components/NoDataFound';
import { Box } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    if (params.slug === null) throw new Error();

    const postId = Number(params.slug);

    const [userId, post] = await Promise.all([getUserId(), getPost(postId)]);

    if (post === null || userId === undefined) return <NoDataFound />;
    const session = await getServerSession(authOptions);

    await new Promise(resolve => setTimeout(resolve, 500));

    return (
      <Box mt={10} minH={'100vh'} mb={10}>
        <Post post={post} userId={userId} />
      </Box>
    );
  } catch (error) {
    return <NoDataFound />;
  }
}
