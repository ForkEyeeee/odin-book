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
    console.log(userFriends);

    const userfriendIds = userFriends.map((friend: Friend) => friend.user2Id);
    const timelinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [userId, ...userfriendIds],
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          authorId: 'asc',
        },
      ],
      include: {
        author: true,
        likes: true,
        comments: true,
      },
    });
    const otherTimeLinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
        {
          authorId: 'asc',
        },
      ],
      include: {
        author: true,
        likes: true,
        comments: true,
      },
    });

    return <TimeLineTabs forYouPosts={timelinePosts} discoverPosts={otherTimeLinePosts} />;
  } catch (error) {
    return <div>Failed to Fetch Posts.</div>; // Return a JSX element for error message
  }
}
