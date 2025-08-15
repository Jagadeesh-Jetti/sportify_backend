import { Request, Response } from 'express';
import {
  createBookingService,
  cancelBookingService,
  getUserBookingsService,
  getVenueBookingsService,
} from '../services/booking.service';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id; // assuming middleware adds user
    const { slotId, sportId } = req.body;

    const booking = await createBookingService(userId, slotId, sportId);
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { bookingId } = req.params;

    const booking = await cancelBookingService(bookingId, userId);
    res.status(200).json({ message: 'Booking cancelled', booking });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const bookings = await getUserBookingsService(userId);
    res.json({ bookings });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getVenueBookings = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user.id;
    const { venueId } = req.params;

    const bookings = await getVenueBookingsService(venueId, ownerId);
    res.json({ bookings });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
