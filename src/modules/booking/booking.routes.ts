import { Router } from 'express';
import {
  createBooking,
  cancelBooking,
  getMyBookings,
  getVenueBookings,
} from '../booking/booking.controller';
import { requireAuth } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', requireAuth, createBooking);
router.delete('/:bookingId', requireAuth, cancelBooking);
router.get('/my', requireAuth, getMyBookings);
router.get('/venue/:venueId', requireAuth, getVenueBookings);

export default router;
