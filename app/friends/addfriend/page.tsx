import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import HomePage from '../../components/HomePage';
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';
import { Post, Friend } from '../../lib/definitions';
import { getFriends } from '../../lib/actions';
import Link from 'next/link';
import { getUsers, searchUsers } from '../../lib/actions';
import AddFriends from '@/app/components/AddFriends';
import Search from '@/app/components/Search';

export default async function Page() {
  try {
    const users = await getUsers();

    return (
      <main>
        {/* <AddFriends users={users} /> */}
        <Search />
      </main>
    );
  } catch (error) {
    return NextResponse.error();
  }
}
