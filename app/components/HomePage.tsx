import { Post } from '../lib/definitions';
import TimeLineTabs from './TimeLineTabs';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { Text } from '@chakra-ui/react';

interface HomePageProps {
  data: Post[];
  otherData: Post[];
}
export async function HomePage({ data, otherData }: HomePageProps) {
  const session = await getServerSession(authOptions);

  if (session === undefined) {
    throw new Error('session is undefined');
  }

  const userId = session?.user.id!;

  const { name, email, profilePicture } = (await prisma.user.findUnique({
    where: {
      id: userId,
    },
  }))!;

  return (
    <div>
      <Text>Home</Text>
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
