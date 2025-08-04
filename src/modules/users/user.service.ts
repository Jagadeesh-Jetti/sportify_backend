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

export const getMyProfileService = async (
  userId: string
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      preferredSports: true,
      venues: true,
      bookings: true,
    },
  });
};

export const updateMyProfileService = async (
  userId: string,
  data: {
    name?: string;
    phone?: string;
    avatarUrl?: string;
    bio?: string;
  }
): Promise<User> => {
  return prisma.user.update({ where: { id: userId }, data });
};

export const getPublicProfile = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      preferredSports: true,
      bio: true,
    },
  });
};
