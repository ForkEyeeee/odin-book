import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import HomePage from '../../components/HomePage';
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';
import { Post, Friend } from '../../lib/definitions';
import { getFriends, getUserId } from '../../lib/actions';
import Link from 'next/link';
import { getUsers, searchUsers } from '../../lib/actions';
import AddFriends from '@/app/components/AddFriends';
import Search from '@/app/components/FilteredFriendsList';
import FilteredFriendsList from '@/app/components/FilteredFriendsList';

export default async function Page() {
  try {
    const { users, userId } = await getUsers();

    return <FilteredFriendsList users={users} userId={userId} />;
  } catch (error) {
    console.error(error);
  }
}
