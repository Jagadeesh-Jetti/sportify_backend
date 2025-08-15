import prisma from '../../config/db';

export const createBookingService = async (userId, slotId, sportId) => {
  const slot = await prisma.slot.findUnique({
    where: { id: slotId },
    include: { venue: true },
  });

  if (!slot) {
    throw new Error('Slot not found');
  }

  const existingBooking = await prisma.booking.findFirst({
    where: { slotId, status: { not: 'CANCELLED' } },
  });

  if (existingBooking) {
    throw new Error('Slot already booked');
  }

  return prisma.booking.create({
    data: {
      userId,
      venueId: slot.venueId,
      sportId,
      slotId,
      date: slot.date || slot.time,
      startTime: slot.time,
      endTime: new Date(
        slot.time.getTime() + slot.venue.slotDurationMinutes * 60000
      ),
      status: 'PENDING',
    },
    include: { user: true, venue: true, sport: true, slot: true },
  });
};

export const cancelBookingService = async (bookingId, userId) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { venue: true },
  });

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.userId !== userId && booking.venue.ownerId !== userId) {
    throw new Error('Not authorized to cancel this booking');
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELLED' },
  });
};

export const getUserBookingsService = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
    include: { venue: true, sport: true, slot: true },
    orderBy: { date: 'desc' },
  });
};

export const getVenueBookingsService = async (venueId, ownerId) => {
  const venue = await prisma.venue.findUnique({ where: { id: venueId } });

  if (!venue || venue.ownerId !== ownerId) {
    throw new Error('Not authorized to view bookings for this venue');
  }

  return prisma.booking.findMany({
    where: { venueId },
    include: { user: true, sport: true, slot: true },
    orderBy: { date: 'desc' },
  });
};
