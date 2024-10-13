import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function generateResetToken(userId: number): Promise<string> {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
}

export async function verifyResetToken(token: string): Promise<number | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const storedToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!storedToken || storedToken.expiresAt < new Date()) {
      return null;
    }

    return storedToken.user.id;
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}