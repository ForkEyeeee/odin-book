import { getFriends } from '../lib/actions';
import FriendsList from '../components/FriendsList';
import NoDataFound from '../components/NoDataFound';
import { Friend } from '../lib/definitions';

export default async function Page() {
  try {
    const friendUsers = (await getFriends()) as Friend[];
    if (friendUsers === undefined) return;

    return <FriendsList friends={friendUsers} />;
  } catch (error) {
    return <NoDataFound />;
  }
}
