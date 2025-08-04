import prisma from '../../config/db';
import { User, Role } from '@prisma/client';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
}
export const createUser = async (data: CreateUserInput): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      ...data,
    },
  });
  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};
