import prisma from '../../config/db';
import { addMinutes, format } from 'date-fns';

export const createVenueService = async (ownerId: string, data: any) => {
  return prisma.venue.create({
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      images: data.images,
      openingHour: data.openingHour,
      closingHour: data.closingHour,
      slotDurationMinutes: data.slotDurationMinutes,
      ownerId,
      sports: {
        connect: data.sports.map((id: string) => ({ id })),
      },
    },
    include: { sports: true, owner: true },
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
  const existing = await prisma.venue.findUnique({ where: { id: venueId } });

  if (!existing || existing.ownerId !== ownerId) {
    throw new Error('Not authorized to update this venue');
  }

  return prisma.venue.update({
    where: { id: venueId },
    data: {
      ...data,
      sports: data.sportsIds
        ? { set: data.sportsIds.map((id: string) => ({ id })) }
        : undefined,
    },
    include: { sports: true },
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

export const defineSlotsService = async (
  venueId: string,
  startTime: string,
  endTime: string,
  slotDuration: number,
  ownerId: string,
  date: Date
) => {
  const venue = await prisma.venue.findUnique({
    where: { id: venueId },
    select: {
      ownerId: true,
      openingHour: true,
      closingHour: true,
      slotDurationMinutes: true,
    },
  });

  if (!venue) {
    throw new Error('Venue not found');
  }

  if (venue.ownerId !== ownerId) {
    throw new Error('Not authorized to define slots for this venue');
  }

  // Convert times into Date objects
  let current = new Date(
    `${date.toISOString().split('T')[0]}T${startTime}:00Z`
  );
  let end = new Date(`${date.toISOString().split('T')[0]}T${endTime}:00Z`);

  const slots: { venueId: string; time: Date; date: Date }[] = [];

  while (current < end) {
    slots.push({
      venueId,
      time: new Date(current),
      date,
    });
    current = addMinutes(current, slotDuration);
  }

  // Insert into DB (skip duplicates)
  await prisma.slot.createMany({
    data: slots,
    skipDuplicates: true,
  });

  return slots;
};

export const assignSportsToVenueService = async (
  venueId: string,
  ownerId: string,
  sportsIds: string[]
) => {
  const venue = await prisma.venue.findUnique({ where: { id: venueId } });

  if (!venue || venue.ownerId !== ownerId) {
    throw new Error('Not authorized to assign sports to this venue');
  }

  return prisma.venue.update({
    where: { id: venueId },
    data: {
      sports: { set: sportsIds.map((id) => ({ id })) },
    },
    include: { sports: true },
  });
};

export const getAvailableSlotsService = async (
  venueId: string,
  date: string // accept string from query
) => {
  const parsedDate = new Date(date); // convert to Date object for Prisma
  if (isNaN(parsedDate.getTime())) {
    throw new Error('Invalid date format');
  }

  // Get all slots
  const allSlots = await prisma.slot.findMany({
    where: {
      venueId,
      date: parsedDate,
    },
    select: {
      id: true,
      time: true,
    },
    orderBy: {
      time: 'asc',
    },
  });

  // Get booked slots
  const bookedSlots = await prisma.booking.findMany({
    where: {
      venueId,
      date: parsedDate,
    },
    select: {
      startTime: true,
    },
  });

  const bookedTimes = bookedSlots.map((b) => format(b.startTime, 'HH:mm'));

  const availableSlots = allSlots.filter(
    (slot) => !bookedTimes.includes(format(slot.time, 'HH:mm'))
  );

  return {
    totalSlots: allSlots.length,
    bookedSlots: bookedTimes.length,
    availableSlots,
  };
};
