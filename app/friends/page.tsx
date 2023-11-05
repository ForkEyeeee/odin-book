import { getFriends } from '../lib/actions';
import FriendsList from '../components/FriendList';
import Link from 'next/link';

export default async function Page() {
  try {
    const friendUsers = await getFriends();
    return (
      <main>
        <Link href={'/friends/addfriend'}>Add Friends</Link>
        <FriendsList friends={friendUsers} />
      </main>
    );
  } catch (error) {
    return { message: `Unable to fetch friends` };
  }
}
