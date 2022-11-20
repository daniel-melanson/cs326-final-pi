import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SECRET } from 'constants';
import prisma from 'db';
import jwt from 'jsonwebtoken';

export async function register(data: Prisma.UserCreateInput & { password: string }): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(data.password, salt);

  data.salt = salt;
  data.hash = hash;

  const user = await prisma.user.create({ data });

  return jwt.sign(user, SECRET);
}

export async function login(data: { email: string; password: string }): Promise<string> {
  const { email, password } = data;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
  });

  const passwordCheck = await bcrypt.compare(password, user.hash);
  if (!passwordCheck) {
    throw new Error('Unauthorized');
  }

  return jwt.sign(user, SECRET);
}
