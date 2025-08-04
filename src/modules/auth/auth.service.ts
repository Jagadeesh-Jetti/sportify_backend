import prisma from '../../config/db';
import bcrypt from 'bcrypt';

import { User, Role } from '@prisma/client';
import { generateToken } from '../../utils/jwt';

interface SignupInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
}

interface LoginInput {
  email: string;
  password: string;
}

export const signup = async (
  name: string,
  email: string,
  password: string,
  role: 'USER' | 'MERCHANT' = 'USER'
): Promise<{ user: User; token: string }> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });
  if (existingUser) throw new Error('Email already taken');

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
};

export const login = async (
  data: LoginInput
): Promise<{ user: User; token: string }> => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, role: user.role });

  return { user, token };
};
