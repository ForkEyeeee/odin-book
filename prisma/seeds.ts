const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        googleId: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        hashedPassword: faker.internet.password(),
        profilePicture: faker.internet.avatar(),
        profile: {
          create: {
            bio: faker.lorem.sentence(),
            dateOfBirth: faker.date.past(),
            gender: faker.random.arrayElement(['Male', 'Female', 'Other']),
          },
        },
        posts: {
          create: [
            {
              content: faker.lorem.paragraph(),
            },
          ],
        },
      },
    });

    const friend = faker.random.arrayElement(
      (await prisma.user.findMany()).filter(u => u.id !== user.id)
    );
    await prisma.friend.create({
      data: {
        user1Id: user.id,
        user2Id: friend.id,
        status: 'ACCEPTED',
      },
    });

    for (let j = 0; j < 2; j++) {
      const receiver = faker.random.arrayElement(
        (await prisma.user.findMany()).filter(u => u.id !== user.id)
      );
      await prisma.message.create({
        data: {
          content: faker.lorem.sentence(),
          senderId: user.id,
          receiverId: receiver.id,
        },
      });
    }

    for (let j = 0; j < 5; j++) {
      const post = faker.random.arrayElement(await prisma.post.findMany());
      await prisma.postLike.create({
        data: {
          authorId: user.id,
          postId: post.id,
        },
      });
    }

    const post = faker.random.arrayElement(await prisma.post.findMany());
    for (let j = 0; j < 3; j++) {
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: user.id,
          postId: post.id,
        },
      });

      for (let k = 0; k < 2; k++) {
        await prisma.commentLike.create({
          data: {
            authorId: user.id,
            commentId: comment.id,
          },
        });
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
