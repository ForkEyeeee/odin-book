import { Post } from '@/app/components/Post';
import prisma from '@/app/lib/prisma';
import { getUserId } from '@/app/lib/actions';
import NoDataFound from '@/app/components/NoDataFound';
import { Box } from '@chakra-ui/react';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const userId = await getUserId();
    let postId;
    if (params.slug === null) return;
    postId = Number(params.slug);
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: true,
            commentLikes: true,
          },
        },
      },
    });
    if (post === null) throw new Error('Unable to find Post');
    return (
      <Box mb={10} h={'100%'}>
        <Post post={post} userId={userId} index={1} />
      </Box>
    );
  } catch (error) {
    <NoDataFound />;
  }
}
