'use server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { User } from './definitions';
import { revalidatePath } from 'next/cache';
const ProfileSchema = z.object({
  bio: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const form = {
      bio: formData.get('bio'),
      gender: formData.get('gender'),
      dateOfBirth: formData.get('dateOfBirth'),
    };
    const parsedData = ProfileSchema.parse(form);

    const dateObj = new Date(parsedData.dateOfBirth ?? '');
    const isoString = dateObj.toISOString();

    const userProfile = {
      bio: parsedData.bio,
      gender: parsedData.gender,
      dateOfBirth: isoString,
      userId: userId,
    };

    const user = (await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })) as User | null;

    if (user === null) return NextResponse.json({ message: 'Unable to find user' });

    if (user.profileId === null) {
      let createUser = await prisma.profile.create({ data: userProfile });
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileId: createUser.id,
        },
      });
    } else {
      const updateProfile = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: userProfile,
      });
    }

    revalidatePath('/profile');
    return { message: `Profile updated`, profile: updateProfile };
  } catch (e) {
    return console.error(e);
  }
}

export async function getProfile(userId: number) {
  const userProfile = prisma.profile.findUnique({
    where: {
      userId: userId,
    },
  });
  return userProfile;
}
