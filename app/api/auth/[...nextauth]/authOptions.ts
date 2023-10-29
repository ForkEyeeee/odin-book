import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
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
          await prisma.user.create({
            data: {
              name: user.name as string,
              email: user.email as string,
              hashedPassword: "",
              profilePicture: user.image,
              googleId: user.id,
            },
          });
          return true;
        }
      } catch (error) {
        console.error("An error occurred during sign-in:", error);
        return false;
      }
    },
    async session({ session, token, user }) {
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
  },
};
