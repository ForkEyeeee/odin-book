import { getUserId } from '../../lib/actions';
import { searchUsers } from '../../lib/actions';
import SearchBox from '@/app/components/SearchBox';

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
    const filteredUsers = await searchUsers(query);
    const userId = await getUserId();
    return <SearchBox filteredUsers={filteredUsers} userId={userId} />;
  } catch (error) {
    return { message: 'Unable to Search' };
  }
}
