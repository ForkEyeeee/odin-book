// "use server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./auth/[...nextauth]/authOptions";
// import prisma from "../lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     console.log(session);

//     const userId = session?.user.id;
//     if (userId === undefined) throw new Error("Unable to find user");

//     const userFriends = await prisma.friend.findMany({
//       where: {
//         user1Id: userId,
//       },
//     });

//     const userfriendIds = userFriends.map((friend) => friend.user2Id);

//     const timelinePosts = await prisma.post.findMany({
//       where: {
//         authorId: {
//           not: {
//             in: [userId, ...userfriendIds],
//           },
//         },
//       },
//     });
//     return NextResponse.json({ timelinePosts });
//   } catch (error) {
//     return NextResponse.json(error);
//   }
// }
