'use server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const ProfileSchema = z.object({
      bio: z.string().optional(),
      gender: z.string().optional(),
      dateOfBirth: z.string().optional(),
    });

    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    let profile;

    const form = {
      bio: formData.get('bio'),
      gender: formData.get('gender'),
      dateOfBirth: formData.get('dateOfBirth'),
    };

    const parsedForm = ProfileSchema.parse(form);
    const parsedDateOfBirth = new Date(parsedForm.dateOfBirth ?? '');
    const isoDateString = parsedDateOfBirth.toISOString();

    const userProfile = {
      bio: parsedForm.bio,
      gender: parsedForm.gender,
      dateOfBirth: isoDateString,
      userId: userId,
    };

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

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
      profile = updateUser;
    } else {
      const updateProfile = await prisma.profile.update({
        where: {
          userId: userId,
        },
        data: userProfile,
      });
      profile = updateProfile;
    }
    revalidatePath('/profile');

    return { message: `Profile updated`, profile: profile };
  } catch (e) {
    return { message: `Unable to update profile` };
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

export async function getFriends() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const userFriends = await prisma.friend.findMany({
    where: {
      user1Id: userId,
    },
    orderBy: {
      status: 'asc',
    },
  });

  const friendIds = userFriends.map(friend => friend.user2Id);

  const friends = await prisma.user.findMany({
    where: {
      id: {
        in: friendIds,
      },
    },
  });

  const combinedFriendsData = userFriends.map(userFriend => {
    const friendData = friends.find(friend => friend.id === userFriend.user2Id);
    return {
      ...userFriend,
      ...friendData,
    };
  });

  return combinedFriendsData;
}

export async function getUsers() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
    },
  });

  return users;
}

export async function searchUsers(query) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
      AND: {
        id: {
          not: userId,
        },
      },
    },
  });
  // console.log(users);
  return users;
}

export async function addFriend(friendUserId) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // const user = await prisma.user.findUnique({
    //   id: userId,
    // });
    const friendToCreate = {
      user1Id: userId,
      user2Id: friendUserId,
      status: 'PENDING',
    };
    const existingFriend = await prisma.friend.findFirst({
      where: {
        user1Id: userId,
        user2Id: friendUserId,
      },
    });

    if (existingFriend !== null) throw new Error('Friend Already Added');

    let updateFriends = await prisma.friend.create({ data: friendToCreate });
    return updateFriends;
  } catch (error) {
    return console.error(error);
  }

  // const friend = await prisma.user.findUnique({
  //   id: friendUserId,
  // });
}

export async function changeStatus(userFriendId: number, action: 'accept' | 'remove') {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
      throw new Error('User not authenticated');
    }

    const friend = await prisma.friend.findFirst({
      where: {
        OR: [
          {
            AND: [{ user1Id: userId }, { user2Id: userFriendId }],
          },
          {
            AND: [{ user1Id: userFriendId }, { user2Id: userId }],
          },
        ],
      },
    });

    if (!friend) {
      throw new Error('Friend relationship not found.');
    }

    switch (action) {
      case 'accept':
        const updatedFriend = await prisma.friend.update({
          where: {
            id: friend.id,
          },
          data: {
            status: 'ACCEPTED',
          },
        });
        revalidatePath('/friends');
        return updatedFriend;

      case 'remove':
        const deletedFriend = await prisma.friend.delete({
          where: {
            id: friend.id,
          },
        });
        revalidatePath('/friends');
        return deletedFriend;

      default:
        throw new Error('Invalid action specified.');
    }
  } catch (error) {
    return { message: `Unable to change friend status` };
  }
}

export async function createPost(prevState: any, formData: FormData) {
  try {
    console.log('here');
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const postData = {
      content: formData.get('post'),
      authorId: userId,
      createdAt: new Date(),
    };

    const createPost = await prisma.post.create({
      data: postData,
    });
    revalidatePath('/');
    return createPost;
  } catch (error) {
    console.error(error);
  }
}

export async function likePost(postAuthor, postId, likesLength) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (likesLength !== 0) {
      const like = await prisma.postLike.deleteMany({
        where: {
          authorId: postAuthor,
          postId: postId,
        },
      });
      revalidatePath('/');
      return like;
    }
    if (userId === undefined) {
      console.log('User ID is undefined, cannot proceed with finding likes.');
      return;
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const like = await prisma.postLike.findFirst({
      where: {
        authorId: postAuthor,
        postId: postId,
      },
    });

    const likeData = {
      authorId: postAuthor,
      postId: postId,
      createdAt: new Date(),
    };
    console.log(like);
    if (like === null) {
      const createLike = await prisma.postLike.create({
        data: likeData,
      });
      console.log('here');
    } else {
      console.log('already liked');
    }

    // const updatePost = await prisma.post.update({
    //   where: {
    //     id: postId,
    //   },
    //   data: {
    //     status: 'ACCEPTED',
    //   },
    // });
    // console.log(postId);
    revalidatePath('/');

    return like;
  } catch (error) {
    return { message: `Unable to change like post` };
  }
}

export async function createComment(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    //check validity of userId and postId combo
    const form = {
      content: formData.get('comment'),
      authorId: userId,
      postId: Number(formData.get('postId')),
      createdAt: new Date(),
    };
    const comment = await prisma.comment.create({
      data: form,
    });
    revalidatePath('/');
    console.log(comment);
  } catch (error) {
    console.error(error);
  }
}
