import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import HomePage from '../components/HomePage';
import prisma from '../lib/prisma';
import { NextResponse } from 'next/server';
import { Post, Friend } from '../lib/definitions';
import { getFriends } from '../lib/actions';
import FriendsList from '../components/FriendList';

export default async function Page() {
  try {
    const friends = await getFriends();
    return (
      <main>
        <FriendsList friends={friends} />
      </main>
    );
  } catch (error) {
    return NextResponse.error();
  }
}
