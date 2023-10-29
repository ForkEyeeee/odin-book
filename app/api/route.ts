import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/authOptions";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return NextResponse.json(session);
}
