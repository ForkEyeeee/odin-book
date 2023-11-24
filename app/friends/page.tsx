import { getFriends } from '../lib/actions';
import FriendsList from '../components/FriendsList';
import NoDataFound from '../components/NoDataFound';

export default async function Page() {
  try {
    const friendUsers = await getFriends();
    if (friendUsers === undefined) return;
    return <FriendsList friends={friendUsers} />;
  } catch (error) {
    return <NoDataFound />;
  }
}
