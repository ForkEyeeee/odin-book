'use server';
import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { getServerActionSession } from './getServerActionSession';

export async function updateProfile(prevState: any, formData: FormData) {
  // const schema = z.object({
  //   todo: z.string().min(1),
  // });
  // const data = schema.parse({
  //   todo: formData.get('todo'),
  // });
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const profileData = {
      bio: formData.get('bio'),
      gender: formData.get('gender'),
      dateOfBirth: formData.get('dateOfBirth'),
    };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const formDate: string | number | Date = formData.get('dateOfBirth');
    const dateObj = new Date(formDate);
    const isoString = dateObj.toISOString();
    const userProfile = {
      bio: formData.get('bio'),
      gender: formData.get('gender'),
      dateOfBirth: isoString,
      userId: userId,
    };
    if (user.profileId === null) {
      console.log('here');

      let createUser = await prisma.profile.create({ data: userProfile });
      const updateUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          profileId: createUser.id,
        },
      });
      console.log(updateUser);
    } else {
      const updateProfile = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: {
          bio: formData.get('bio'),
          gender: formData.get('gender'),
          dateOfBirth: isoString,
          userId: userId,
        },
      });
    }

    // revalidatePath('/');
    return { message: `Added todo` };
  } catch (e) {
    return console.error(e);
  }
}
