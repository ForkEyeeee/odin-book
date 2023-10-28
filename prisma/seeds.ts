const { PrismaClient, FriendshipStatus } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      hashedPassword: "hashedpassword1",
      profilePicture: "alice.jpg",
      posts: {
        create: [
          {
            content: "Hello world!",
            imageUrl: "image1.jpg",
          },
          {
            content: "How are you?",
            imageUrl: "image2.jpg",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      hashedPassword: "hashedpassword2",
      profilePicture: "bob.jpg",
      posts: {
        create: [
          {
            content: "This is my first post!",
            imageUrl: "image3.jpg",
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "charlie@example.com",
      hashedPassword: "hashedpassword3",
      profilePicture: "charlie.jpg",
    },
  });

  if (user2.posts && user2.posts[0]) {
    await prisma.friend.create({
      data: {
        user1Id: user1.id,
        user2Id: user2.id,
        status: FriendshipStatus.PENDING,
      },
    });

    await prisma.friend.create({
      data: {
        user1Id: user1.id,
        user2Id: user3.id,
        status: FriendshipStatus.ACCEPTED,
      },
    });

    await prisma.like.create({
      data: {
        authorId: user1.id,
        postId: user2.posts[0].id,
      },
    });

    await prisma.comment.create({
      data: {
        content: "Nice post!",
        authorId: user1.id,
        postId: user2.posts[0].id,
      },
    });
  } else {
    console.error("Posts for user2 were not created.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
