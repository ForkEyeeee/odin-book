import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import prisma from './lib/prisma';
import { Friend } from './lib/definitions';
import TimeLineTabs from './components/TimeLineTabs';

export default async function Page() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (userId === undefined) throw new Error();

    const userFriends = await prisma.friend.findMany({
      where: {
        user1Id: userId,
      },
    });

    const userfriendIds = userFriends.map((friend: Friend) => friend.user2Id);
    const timelinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [userId, ...userfriendIds],
        },
      },
      orderBy: [
        {
          authorId: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      include: {
        author: true,
      },
    });
    // console.log(timelinePosts);
    const otherTimeLinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
      include: {
        author: true,
      },
    });

    return <TimeLineTabs forYouPosts={timelinePosts} discoverPosts={otherTimeLinePosts} />;
  } catch (error) {
    return { message: 'Failed to Fetch Posts.' };
  }
}
