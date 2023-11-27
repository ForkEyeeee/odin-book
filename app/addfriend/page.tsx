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
    const filteredUsers = (await searchUsers(query)) as User[];
    const userId = await getUserId();
    return <SearchBox filteredUsers={filteredUsers} userId={userId} />;
  } catch (error) {
    return <NoDataFound />;
  }
}
