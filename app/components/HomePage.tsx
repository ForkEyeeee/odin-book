import { Post } from '../lib/definitions';
import { UserPost } from './UserPost';
import TimeLineTabs from './TimeLineTabs';
import { Text } from '@chakra-ui/react';
import { User } from '../lib/definitions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';

interface HomePageProps {
  data: Post[];
  otherData: Post[];
}
export async function HomePage({ data, otherData }: HomePageProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id!;

  const { name, email, profilePicture } = (await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  }))!;

  return (
    <div>
      <TimeLineTabs
        data={data}
        otherData={otherData}
        name={name}
        email={email}
        profilePicture={profilePicture}
        userId={userId}
      />
    </div>
  );
}

export default HomePage;
