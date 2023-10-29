//actions.ts
"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/prisma";

export async function getTimeline() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (userId === undefined) throw new Error("Unable to find user");

    const userFriends = await prisma.friend.findMany({
      where: {
        user1Id: userId,
      },
    });

    const userfriendIds = userFriends.map((friend) => friend.user2Id);

    const timelinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
    });
    return timelinePosts;
  } catch (error) {
    console.error(error);
  }
}
