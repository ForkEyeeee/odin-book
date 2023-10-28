import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Sup" });
}
