import prisma from '../../config/db';
import { User, Role, BookingStatus } from '@prisma/client';

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getAdminDashboardService = async () => {
  const usersCount = await prisma.user.count();
  const venuesCount = await prisma.venue.count();
  const bookingsCount = await prisma.booking.count();
  const merchantsCount = await prisma.user.count({
    where: { role: 'MERCHANT' },
  });

  return {
    usersCount,
    venuesCount,
    bookingsCount,
    merchantsCount,
  };
};
