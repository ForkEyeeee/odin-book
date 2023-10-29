import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
const prisma = new PrismaClient();

export default async function Page() {
  const session = await getServerSession();
  // const userId = session?.user?.id;
  console.log(session);
  // if (userId) {
  //   const users = await prisma.post.find({
  //     where: {
  //       Id: userId, //
  //     },
  //   });
  //   // console.log(users);
  // }

  return <div></div>;
}
