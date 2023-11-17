'use server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { FriendshipStatus } from '@prisma/client';

const getUserId = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (userId === undefined) throw new Error('Unable to find user');

    return userId;
  } catch (error) {
    throw new Error(`Error finding current user`);
  }
};

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const ProfileSchema = z.object({
      bio: z.string().optional(),
      gender: z.string().optional(),
      dateOfBirth: z.string().optional(),
    });

    const userId = await getUserId();

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
  try {
    const userId = await getUserId();

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
    });

    return users;
  } catch (error) {
    return { message: `Unable to get all users` };
  }
}

export async function searchUsers(query: string) {
  try {
    const userId = await getUserId();
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
    return users;
  } catch (error) {
    return { message: `Unable to search for friends` };
  }
}

export async function addFriend(friendUserId: number) {
  try {
    const userId = await getUserId();

    const friendToCreate = {
      user1Id: userId,
      user2Id: friendUserId,
      status: FriendshipStatus.PENDING,
    };

    const existingFriend = await prisma.friend.findFirst({
      where: {
        user1Id: userId,
        user2Id: friendUserId,
        status: FriendshipStatus.PENDING,
      },
    });

    if (existingFriend !== null) throw new Error('Friend Already Added');

    const updateFriends = await prisma.friend.create({ data: friendToCreate });
    return updateFriends;
  } catch (error) {
    return console.error(error);
  }
}

export async function changeStatus(userFriendId: number, action: 'accept' | 'remove') {
  try {
    const userId = await getUserId();

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

    let changedFriend;

    switch (action) {
      case 'accept':
        changedFriend = await prisma.friend.update({
          where: {
            id: friend.id,
          },
          data: {
            status: 'ACCEPTED',
          },
        });
        revalidatePath('/friends');
        return changedFriend;

      case 'remove':
        changedFriend = await prisma.friend.delete({
          where: {
            id: friend.id,
          },
        });
        revalidatePath('/friends');
        return changedFriend;

      default:
        throw new Error('Invalid action specified.');
    }
  } catch (error) {
    return { message: `Unable to change friend status` };
  }
}

export async function createPost(prevState: any, formData: FormData) {
  try {
    const userId = await getUserId();

    const postSchema = z.object({
      content: z.string(),
      createdAt: z.date(),
    });

    const form = {
      content: formData.get('post'),
      authorId: userId,
      createdAt: new Date(),
    };

    const parsedForm = postSchema.parse(form);

    const postData = {
      content: parsedForm.content,
      authorId: userId,
      createdAt: parsedForm.createdAt,
    };

    const createdPost = await prisma.post.create({
      data: postData,
    });
    revalidatePath('/');
    return createdPost;
  } catch (error) {
    return { message: `Unable to create Post` };
  }
}

export async function likePost(postAuthor: number, postId: number, likesLength: number) {
  try {
    if (likesLength !== 0) {
      const foundLike = await prisma.postLike.deleteMany({
        where: {
          authorId: postAuthor,
          postId: postId,
        },
      });
      revalidatePath('/');
    }

    const foundPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const foundLike = await prisma.postLike.findFirst({
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

    if (foundLike === null) {
      const createLike = await prisma.postLike.create({
        data: likeData,
      });
    } else {
      throw new Error(`You've already liked this post`);
    }
    revalidatePath('/');
  } catch (error) {
    return { message: `Unable to like post` };
  }
}

export async function likeComment(postAuthor: number, commentId: number, likesLength: number) {
  try {
    if (likesLength !== 0) {
      const like = await prisma.commentLike.deleteMany({
        where: {
          authorId: postAuthor,
          commentId: commentId,
        },
      });
      revalidatePath('/');
    }

    const foundComment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    const foundLike = await prisma.commentLike.findFirst({
      where: {
        authorId: postAuthor,
        commentId: commentId,
      },
    });

    const likeData = {
      authorId: postAuthor,
      commentId: commentId,
      createdAt: new Date(),
    };

    if (foundLike === null) {
      const createdLike = await prisma.commentLike.create({
        data: likeData,
      });
    } else {
      const foundLike = await prisma.commentLike.deleteMany({
        where: {
          authorId: postAuthor,
          commentId: commentId,
        },
      });
    }
    revalidatePath('/');
  } catch (error) {
    return { message: `Unable to like comment` };
  }
}

export async function createComment(prevState: any, formData: FormData) {
  try {
    const userId = await getUserId();

    const commentSchema = z.object({
      content: z.string(),
      postId: z.string().transform(str => Number(str)),
    });

    const form = {
      content: formData.get('comment'),
      authorId: userId,
      postId: Number(formData.get('postId')),
      createdAt: new Date(),
    };

    const parsedForm = commentSchema.parse(form);

    const commentData = {
      content: parsedForm.content,
      authorId: userId,
      postId: parsedForm.postId,
      createdAt: new Date(),
    };

    const createdComment = await prisma.comment.create({
      data: commentData,
    });

    revalidatePath('/');
    return createdComment;
  } catch (error) {
    return { message: `Messages unsuccessfully created` };
  }
}

export async function getMessages(receiverId: number) {
  try {
    const userId = await getUserId();

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: receiverId,
          },
          {
            senderId: receiverId,
            receiverId: userId,
          },
        ],
      },

      orderBy: {
        createdAt: 'asc',
      },
    });

    const senderResult = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const recipientResult = await prisma.user.findUnique({
      where: {
        id: receiverId,
      },
    });

    const sender = senderResult ? senderResult.name : null;
    const recipient = recipientResult ? recipientResult.name : null;
    const profilePicture = recipientResult ? recipientResult.profilePicture : null;

    return { messages, sender, recipient, profilePicture };
  } catch (error) {
    return { message: `Messages unsuccessfully fetched` };
  }
}

export async function createMessage(prevState: any, formData: FormData) {
  try {
    const userId = await getUserId();
    if (userId === undefined) throw new Error('Unable to find user');

    const messageSchema = z.object({
      content: z.string(),
      receiverId: z.string().transform(str => Number(str)),
    });

    const form = {
      content: formData.get('message'),
      senderId: userId,
      receiverId: formData.get('receiverId'),
      createdAt: new Date(),
      read: false,
    };

    const parsedForm = messageSchema.parse(form);

    const messageData = {
      content: parsedForm.content,
      senderId: userId,
      receiverId: parsedForm.receiverId,
      createdAt: new Date(),
      read: false,
    };

    const createdMessage = await prisma.message.create({
      data: messageData,
    });
    revalidatePath(`/`);
    return createdMessage;
  } catch (error) {
    return { message: `Message unsuccessfully created` };
  }
}

export async function deleteMessage(messageId: number, receiverId: number) {
  try {
    const message = await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    revalidatePath(`/messages/${receiverId}`);
    return message;
  } catch (error) {
    return { message: `Message unsuccessfully deleted` };
  }
}

export async function updateMessage(prevState: any, formData: FormData) {
  try {
    const userId = await getUserId();

    if (userId === undefined) throw new Error('Unable to find user');

    const messageSchema = z.object({
      message: z.string(),
      receiverId: z.string().transform(str => Number(str)),
      messageId: z.string().transform(str => Number(str)),
    });

    const form = {
      message: formData.get('message'),
      senderId: userId,
      receiverId: formData.get('receiverId'),
      messageId: formData.get('messageId'),
    };

    const parsedForm = messageSchema.parse(form);

    const messageData = {
      messageId: parsedForm.messageId,
      content: parsedForm.message,
      senderId: userId,
      receiverId: parsedForm.receiverId,
      createdAt: new Date(),
      read: false,
    };

    const updatedMessage = await prisma.message.update({
      where: {
        id: parsedForm.messageId,
      },
      data: messageData,
    });
    revalidatePath(`/messages/${form.receiverId}`);
    return updatedMessage;
  } catch (error) {
    return { message: `Message unsuccessfully updated` };
  }
}
