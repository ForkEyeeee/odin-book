import { Post } from '@/app/components/Post';
import { getPost, getUser, getUserId } from '@/app/lib/actions';
import NoDataFound from '@/app/components/NoDataFound';
import { Box } from '@chakra-ui/react';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    if (params.slug === null) throw new Error();

    const postId = Number(params.slug);

    const [userId, post] = await Promise.all([getUserId(), getPost(postId)]);

    if (post === null || post === undefined || userId === undefined) return <NoDataFound />;

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
