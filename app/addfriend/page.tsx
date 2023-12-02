import { getUserId } from '../lib/actions';
import { searchUsers } from '../lib/actions';
import SearchBox from '@/app/components/SearchBox';
import NoDataFound from '@/app/components/NoDataFound';
import { User } from '@/app/lib/definitions';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  try {
    const query = searchParams?.query || '';
    const [userData, userId] = await Promise.all([searchUsers(query), getUserId()]);

    if (userData === undefined || userId === undefined) return <NoDataFound />;

    return <SearchBox filteredUsers={userData as User[]} userId={userId} />;
  } catch (error) {
    return <NoDataFound />;
  }
}
