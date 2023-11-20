import { Post } from '@/app/components/Post';
import prisma from '@/app/lib/prisma';
import { getUserId } from '@/app/lib/actions';

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
    return <Post post={post} userId={userId} index={1} />;
  } catch (error) {
    console.error(error);
  }
}
