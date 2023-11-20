import Profile from '@/app/components/Profile';
import prisma from '@/app/lib/prisma';

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: Number(params.slug),
      },
    });

    return <Profile profile={profile} />;
  } catch (error) {
    return { message: `Unable to fetch profile` };
  }
}
