import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/authOptions';
import prisma from '../../lib/prisma';
import { NextResponse } from 'next/server';
import { Post, Friend } from '../../lib/definitions';
import { getFriends, getUserId } from '../../lib/actions';
import Link from 'next/link';
import { getUsers, searchUsers } from '../../lib/actions';
import { FormControl, Input, FormHelperText, FormLabel, Box } from '@chakra-ui/react';
import { useState } from 'react';
import FilteredFriendsList from '@/app/components/FilteredFriendsList';
import SearchBox from '@/app/components/SearchBox';
export default async function Page() {
  try {
    const { users, userId } = await getUsers();
    return <SearchBox userId={userId} />;
  } catch (error) {
    console.error(error);
  }
}
