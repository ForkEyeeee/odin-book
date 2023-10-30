import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import HomePage from './components/HomePage';
import prisma from './lib/prisma';
import { NextResponse } from 'next/server';
import { Post } from './lib/definitions';

export default async function Page() {
  try {
    const session = await getServerSession(authOptions);

    const userId = session?.user.id;
    if (userId === undefined) return NextResponse.json({ error: 'Unable to find user' });

    const userFriends = await prisma.friend.findMany({
      where: {
        user1Id: userId,
      },
    });
    const userfriendIds = userFriends.map(friend => friend.user2Id);

    const timelinePosts: Post[] = await prisma.post.findMany({
      where: {
        authorId: {
          in: [userId, ...userfriendIds],
        },
      },
    });

    const otherTimeLinePosts: Post[] = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
    });

    return (
      <main>
        <HomePage data={timelinePosts} otherData={otherTimeLinePosts} />;
      </main>
    );
  } catch (error) {
    return NextResponse.error();
  }
}
