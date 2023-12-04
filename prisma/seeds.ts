const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function createDummyData() {
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        googleId: `google-${i}`,
        name: faker.name.findName(),
        email: faker.internet.email(),
        profilePicture: faker.image.avatar(),
        profile: {
          create: {
            bio: faker.lorem.sentence(),
            dateOfBirth: faker.date.past(30, new Date('2000-01-01')),
            gender: faker.random.arrayElement(['Male', 'Female', 'Other']),
          },
        },
      },
    });

    const post = await prisma.post.create({
      data: {
        content: faker.lorem.paragraphs(2),
        imageUrl: faker.image.imageUrl(),
        blurURL: faker.image.imageUrl(),
        authorId: user.id,
      },
    });

    await prisma.comment.create({
      data: {
        content: faker.lorem.sentence(),
        authorId: user.id,
        postId: post.id,
      },
    });

    if (i > 1) {
      await prisma.postLike.create({
        data: {
          authorId: i - 1,
          postId: post.id,
        },
      });

      await prisma.friend.create({
        data: {
          user1Id: i,
          user2Id: i - 1,
          status: faker.random.arrayElement(['PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED']),
        },
      });

      await prisma.message.create({
        data: {
          content: faker.lorem.sentence(),
          senderId: i,
          receiverId: i - 1,
        },
      });
    }
  }
}

createDummyData()
  .catch(e => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
