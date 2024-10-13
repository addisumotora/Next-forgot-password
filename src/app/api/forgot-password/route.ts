import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateResetToken } from '@/app/utils/auth';
import { sendPasswordResetEmail } from '@/app/utils/send-email';


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const token = await generateResetToken(user.id);
    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
