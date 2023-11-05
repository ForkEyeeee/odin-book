import { getProfile } from '../lib/actions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import Profile from '../components/Profile';

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  try {
    if (userId === undefined) return;
    const profile = await getProfile(userId);
    if (profile === null) return;
    return <Profile profile={profile} />;
  } catch (error) {
    return { message: `Unable to fetch profile` };
  }
}
