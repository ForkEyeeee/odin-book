const { PrismaClient, FriendshipStatus } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const userIds = [];
  const postIds = [];
  const commentIds = [];

  for (let i = 1; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        googleId: `googleId${i}`,
        name: `User Name ${i}`,
        email: `user${i}@example.com`,
        hashedPassword: `hashedPassword${i}`,
      },
    });
    userIds.push(user.id);

    for (let j = 1; j <= 3; j++) {
      const post = await prisma.post.create({
        data: {
          content: `This is a detailed post by User ${i}, post number ${j}.`,
          authorId: user.id,
        },
      });
      postIds.push(post.id);
    }
  }

  for (const postId of postIds) {
    const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
    const selectedUserIds = shuffledUserIds.slice(0, 3);

    for (const userId of selectedUserIds) {
      const comment = await prisma.comment.create({
        data: {
          content: `This is a comment by User ${userId} on Post ${postId}.`,
          authorId: userId,
          postId: postId,
        },
      });
      commentIds.push(comment.id);
    }
  }

  for (const postId of postIds) {
    const numLikes = Math.floor(Math.random() * userIds.length);
    const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
    const selectedUserIds = shuffledUserIds.slice(0, numLikes);

    for (const userId of selectedUserIds) {
      await prisma.postLike.create({
        data: {
          authorId: userId,
          postId: postId,
        },
      });
    }
  }

  for (const commentId of commentIds) {
    const numLikes = Math.floor(Math.random() * userIds.length);
    const shuffledUserIds = [...userIds].sort(() => 0.5 - Math.random());
    const selectedUserIds = shuffledUserIds.slice(0, numLikes);

    for (const userId of selectedUserIds) {
      await prisma.commentLike.create({
        data: {
          authorId: userId,
          commentId: commentId,
        },
      });
    }
  }

  for (const userId of userIds) {
    const shuffledUserIds = [...userIds]
      .filter((id) => id !== userId)
      .sort(() => 0.5 - Math.random());
    const selectedUserIds = shuffledUserIds.slice(0, 3);

    for (const friendId of selectedUserIds) {
      await prisma.friend.create({
        data: {
          user1Id: userId,
          user2Id: friendId,
          status: FriendshipStatus.ACCEPTED,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
