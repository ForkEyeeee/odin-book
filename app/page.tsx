import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import prisma from "@/prisma/prisma";
import { User } from "./lib/definitions";
import { Session } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const userPosts = await prisma.post.findMany({
    where: {
      id: userId,
    },
  });
  console.log(userPosts);
}
