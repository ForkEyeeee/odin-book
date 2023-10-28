import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const users = await prisma.user.findMany();
  // NextResponse.json(users);
  return NextResponse.json(users, { status: 200 });

  // res.status(200).json(users);
}
