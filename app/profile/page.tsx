import { getProfile } from '../lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import Profile from '../components/Profile';
import ProfilePost from '../components/ProfilePost';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    if (userId === undefined) return;
    const profile = await getProfile(userId);
    if (profile === null) return;
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    return (
      <div>
        <Profile profile={profile} posts={posts} />
      </div>
    );
  } catch (error) {
    return { message: `Unable to fetch profile` };
  }
}
