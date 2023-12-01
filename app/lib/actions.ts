'use server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import prisma from './prisma';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { FriendshipStatus } from '@prisma/client';
import axios from 'axios';
import crypto from 'crypto';
import { extractPublicId } from 'cloudinary-build-url';
import { getPlaiceholder } from 'plaiceholder';

export const getUserId = async () => {
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
      gender: z.string().optional().nullish(),
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

    const parsedDateOfBirth =
      parsedForm.dateOfBirth !== '' ? new Date(parsedForm.dateOfBirth ?? '') : '';
    const isoDateString = parsedDateOfBirth !== '' ? parsedDateOfBirth.toISOString() : '';

    const userProfile = {
      bio: parsedForm.bio,
      gender: parsedForm.gender,
      dateOfBirth: isoDateString === '' ? null : isoDateString,
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
    revalidatePath('/');

    return { message: `Profile updated`, profile: profile };
  } catch (e) {
    console.error(e);
    return { message: `Unable to update profile` };
  }
}

export async function getProfile(userId: number) {
  try {
    const userProfile = await prisma.profile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
    return userProfile;
  } catch (error) {
    return { message: `Unable to find profile` };
  }
}

export async function getFriendsSideBar() {
  const userId = await getUserId();

  const userFriends = await prisma.friend.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
      AND: [{ status: 'ACCEPTED' }],
    },
    orderBy: {
      status: 'desc',
    },
  });
  const friendIds = userFriends.flatMap(friend =>
    friend.user1Id === userId ? [friend.user2Id] : [friend.user1Id]
  );

  const uniqueFriendIds = Array.from(new Set(friendIds));

  const friends = await prisma.user.findMany({
    where: {
      id: {
        in: uniqueFriendIds,
      },
    },
    include: {
      sentMessages: true,
      receivedMessages: true,
    },
  });

  const combinedFriendsData = uniqueFriendIds.map(friendId => {
    const friendData = friends.find(friend => friend.id === friendId);
    const userFriend = userFriends.find(
      friend => friend.user1Id === friendId || friend.user2Id === friendId
    );
    revalidatePath('/');
    return friendData ? { ...userFriend, ...friendData } : userFriend;
  });
  return combinedFriendsData;
}

export async function getFriends() {
  const userId = await getUserId();

  const userFriends = await prisma.friend.findMany({
    where: {
      OR: [{ user1Id: userId }, { user2Id: userId }],
    },
    orderBy: {
      status: 'desc',
    },
  });
  const friendIds = userFriends.flatMap(friend =>
    friend.user1Id === userId ? [friend.user2Id] : [friend.user1Id]
  );

  const uniqueFriendIds = Array.from(new Set(friendIds));

  const friends = await prisma.user.findMany({
    where: {
      id: {
        in: uniqueFriendIds,
      },
    },
    include: {
      sentMessages: true,
      receivedMessages: true,
    },
  });

  const combinedFriendsData = uniqueFriendIds.map(friendId => {
    const friendData = friends.find(friend => friend.id === friendId);
    const userFriend = userFriends.find(
      friend => friend.user1Id === friendId || friend.user2Id === friendId
    );
    revalidatePath('/');

    return friendData ? { ...userFriend, ...friendData } : userFriend;
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
      include: {
        friendsAsUser1: true,
      },
    });

    return { users, userId };
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
      include: {
        friendsAsUser1: true,
        friendsAsUser2: true,
      },
      orderBy: {
        name: 'asc',
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

    if (existingFriend !== null) return true;

    const updateFriends = await prisma.friend.create({ data: friendToCreate });

    revalidatePath('/');
    return false;
  } catch (error) {
    return { message: 'Unable to add friend' };
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
        const deletedMessages = await prisma.message.deleteMany({
          where: {
            OR: [
              {
                senderId: userId,
                receiverId: userFriendId,
              },
              {
                senderId: userFriendId,
                receiverId: userId,
              },
            ],
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

const generateSHA1 = (data: string) => {
  const hash = crypto.createHash('sha1');
  hash.update(data);
  return hash.digest('hex');
};

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

const uploadPost = async (imgUrl: string) => {
  try {
    const publicId = extractPublicId(imgUrl);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME;
    const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const signature = generateSHA1(generateSignature(publicId, apiSecret!!));
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('signature', signature);
    formData.append('api_key', apiKey as string);

    const response = await axios.post(url, formData);
  } catch (error) {
    return { message: `Post unsuccessfully deleted` };
  }
};

export async function deletePost(postId: number, imgUrl: string) {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    const response = await uploadPost(imgUrl);
    revalidatePath('/');
    return response;
  } catch (error) {
    return { message: `Post unsuccessfully deleted` };
  }
}

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    console.log(`base64: ${base64}`);

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export async function createPost(prevState: any, formData: FormData) {
  try {
    const userId = await getUserId();

    const postSchema = z.object({
      post: z.string(),
      imageUrl: z.string().optional(),
      blurURL: z.string().optional(),
      createdAt: z.string(),
    });

    const imageUrl = formData.get('image-url') as string;
    let blurURL = '';

    if (imageUrl) {
      const base64Url = await getBase64(imageUrl);
      blurURL = base64Url ?? '';
    }

    const form = {
      post: formData.get('post'),
      imageUrl,
      blurURL,
      createdAt: new Date().toISOString(),
    };

    const parsedForm = postSchema.parse(form);

    const createdPost = await prisma.post.create({
      data: {
        content: parsedForm.post,
        authorId: userId,
        createdAt: parsedForm.createdAt,
        imageUrl: parsedForm.imageUrl,
        blurURL: parsedForm.blurURL,
      },
    });

    revalidatePath('/');
    return { ...createdPost, success: true };
  } catch (error) {
    console.error(error);
    return { message: `Unable to create Post` };
  }
}
export async function likePost(postId: number) {
  try {
    const userId = await getUserId();

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });

    const totalLikes = post?.likes.length;

    const userLike = await prisma.postLike.findMany({
      where: {
        authorId: userId,
        postId: postId,
      },
    });

    if (userLike.length > 0) {
      const deletedLike = await prisma.postLike.delete({
        where: {
          id: userLike[0].id,
        },
      });
    } else {
      const likeData = {
        authorId: userId,
        postId: postId,
        createdAt: new Date(),
      };

      const createdLike = await prisma.postLike.create({
        data: likeData,
      });
    }
    revalidatePath('/');
  } catch (error) {
    return { message: `Unable to like post` };
  }
}

export async function likeComment(commentId: number, postId: number) {
  try {
    const userId = await getUserId();

    const userLike = await prisma.commentLike.findMany({
      where: {
        authorId: userId,
        commentId: commentId,
        postId: postId,
      },
    });

    if (userLike.length > 0) {
      const deletedLike = await prisma.commentLike.delete({
        where: {
          id: userLike[0].id,
        },
      });
    } else {
      const likeData = {
        authorId: userId,
        commentId: commentId,
        createdAt: new Date(),
        postId: postId,
      };

      const createdLike = await prisma.commentLike.create({
        data: likeData,
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
      postId: formData.get('postId'),
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

export async function deleteComment(commentId: number) {
  try {
    const result = await prisma.$transaction(async prisma => {
      await prisma.commentLike.deleteMany({
        where: {
          commentId: commentId,
        },
      });

      return await prisma.comment.delete({
        where: {
          id: commentId,
        },
      });
    });

    revalidatePath('/');
    return result;
  } catch (error) {
    return { message: `Comment unsuccessfully deleted` };
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
      read: true,
    };
    const updatedMessage = await prisma.message.update({
      where: {
        id: parsedForm.messageId,
      },
      data: {
        content: parsedForm.message,
        read: true,
      },
    });
    revalidatePath(`/`);
    return updatedMessage;
  } catch (error) {
    return { message: `Message unsuccessfully updated` };
  }
}

export async function getPosts(page = 1) {
  try {
    const userId = await getUserId();
    if (userId === undefined) throw new Error();
    const userFriends = await prisma.friend.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
        AND: [{ status: 'ACCEPTED' }],
      },
    });
    const pageNumber = isNaN(page) || page < 1 ? 1 : page; // Default to page 1 if invalid
    const take = 5;
    const skip = (pageNumber - 1) * take;

    const userfriendIds = userFriends.map(friend =>
      friend.user1Id === userId ? friend.user2Id : friend.user1Id
    );
    // Fetch timeline posts with pagination
    const timelinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [userId, ...userfriendIds],
        },
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: true,
            commentLikes: true,
          },
        },
      },
    });
    // Fetch other timeline posts with pagination
    const otherTimeLinePosts = await prisma.post.findMany({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        likes: true,
        comments: {
          include: {
            author: true,
            commentLikes: true,
          },
        },
      },
    });

    // Get total count of timeline posts
    const timelinePostsCount = await prisma.post.count({
      where: {
        authorId: {
          in: [userId, ...userfriendIds],
        },
      },
    });

    // Get total count of other timeline posts
    const otherTimelinePostsCount = await prisma.post.count({
      where: {
        authorId: {
          not: {
            in: [userId, ...userfriendIds],
          },
        },
      },
    });

    return {
      timelinePosts,
      otherTimeLinePosts,
      timelinePostsCount,
      otherTimelinePostsCount,
      userId,
    };
  } catch (error) {
    return { message: 'Unable to fetch posts' };
  }
}

export async function getUserPosts(page: number, userId: number) {
  try {
    const pageNumber = isNaN(page) || page < 1 ? 1 : page; // Default to page 1 if invalid
    const take = 5;

    const skip = (pageNumber - 1) * take;
    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      take: take,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const postsCount = await prisma.post.count({
      where: {
        authorId: userId,
      },
    });

    if (userPosts === undefined)
      return {
        userPosts: [],
        postsCount: 0,
      };

    return { userPosts, postsCount };
  } catch (error) {
    return { message: 'Unable to fetch user posts' };
  }
}

export async function getUnreadMessagesCount(receiverId: number | null) {
  try {
    const userId = await getUserId();
    let unReadMessages = null;

    if (receiverId !== null) {
      unReadMessages = await prisma.message.findMany({
        where: {
          receiverId: userId,
          senderId: receiverId,
          read: false,
        },
      });
    }

    const unreadMessageCount = await prisma.message.count({
      where: {
        receiverId: userId,
        read: false,
      },
    });
    return { unreadMessageCount, unReadMessages };
  } catch (error) {
    console.error(error);
    return { message: 'Unable to fetch unread message count' };
  }
}

export async function setReadMessages(receiverId: number) {
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));

    const userId = await getUserId();

    await prisma.message.updateMany({
      where: {
        receiverId: userId,
        senderId: receiverId,
        read: false,
      },
      data: {
        read: true,
      },
    });
    revalidatePath('/');
  } catch (error) {
    return { message: 'Unable to set messages as read' };
  }
}
