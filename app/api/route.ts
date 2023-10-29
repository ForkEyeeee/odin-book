import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
const prisma = new PrismaClient();

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getServerSession();
//   // const session: any = await getToken({
//   //   req,
//   //   secret: process.env.NEXTAUTH_SECRET,
//   // });
//   console.log("server session: " + JSON.stringify(session));

//   const posts = await prisma.post.findMany();
//   // console.log(posts);
//   // NextResponse.json(users);
//   return NextResponse.json(posts, { status: 200 });

//   // res.status(200).json(users);
// }
