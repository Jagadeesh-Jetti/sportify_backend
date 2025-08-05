import prisma from '../../config/db';

export const createVenueService = async (ownerId: string, data: any) => {
  return prisma.venue.create({
    data: {
      ...data,
      ownerId,
    },
  });
};

export const getMyVenuesService = async (ownerId: string) => {
  return prisma.venue.findMany({
    where: { ownerId },
    include: { sports: true, bookings: true },
  });
};

export const getAllVenuesService = async () => {
  return prisma.venue.findMany({
    include: { sports: true, reviews: true },
  });
};

export const getVenuesByIdService = async (venueId: string) => {
  return prisma.venue.findUnique({
    where: { id: venueId },
    include: { sports: true, reviews: true, bookings: true },
  });
};

export const updateVenueService = async (
  venueId: string,
  ownerId: string,
  data: any
) => {
  const venue = await prisma.venue.findUnique({ where: { id: venueId } });

  if (!venue || venue.ownerId !== ownerId) {
    throw new Error('Not authorized to update this venue');
  }

  return prisma.venue.update({
    where: { id: venueId },
    data,
  });
};

export const deleteVenueService = async (venueId: string, ownerId: string) => {
  const venue = await prisma.venue.findUnique({ where: { id: venueId } });

  if (!venue || venue.ownerId !== ownerId) {
    throw new Error('Not authorized to delete this venue');
  }

  return prisma.venue.delete({
    where: { id: venueId },
  });
};
