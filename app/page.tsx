import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  // return <pre></pre>;
}
