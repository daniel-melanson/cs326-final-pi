import { PrismaClient } from '@prisma/client';

async function testPrisma() {
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: {
      firstName: 'U',
      lastName: 'Mass',
      email: 'umass@umass.edu',
      hash: 'ertferfrg',
      salt: 'dfgfbrbr',
    },
  });
}

async function testPrisma2() {
  const prisma = new PrismaClient();

  const user = await prisma.user.findMany();

  console.log(user);
}

testPrisma2();
