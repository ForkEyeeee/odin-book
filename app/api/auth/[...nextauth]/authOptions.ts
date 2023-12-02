import prisma from 'app/lib/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';
import type { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id: number;
      hashedPassword?: string;
      profilePicture?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Guest',
      credentials: {},
      async authorize() {
        const user = {
          id: '112158723423422332704',
        };
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: {
            googleId: user.id,
          },
        });
        if (existingUser) {
          return true;
        } else {
          const createdUser = await prisma.user.create({
            data: {
              name: user.name as string,
              email: user.email as string,
              hashedPassword: '',
              profilePicture: user.image,
              googleId: user.id,
            },
          });
          const createdProfile = await prisma.profile.create({
            data: {
              userId: createdUser.id,
            },
          });
          await prisma.user.update({
            where: {
              id: createdUser.id,
            },
            data: {
              profileId: createdProfile.id,
            },
          });
          return true;
        }
      } catch (error) {
        console.error('An error occurred during sign-in:', error);
        return false;
      }
    },
    async session({ session, token, user }: { session: Session; token: any; user: any }) {
      const dbUser = await prisma.user.findUnique({
        where: { googleId: token.sub },
      });
      if (dbUser) {
        return {
          ...session,
          user: {
            ...session.user,
            id: dbUser.id,
          },
        };
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
