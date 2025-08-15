import { Router } from 'express';
import userRoutes from './modules/users/user.routes';
import authRoutes from './modules/auth/auth.routes';
import venueRoutes from './modules/venue/venue.routes';
import bookingRoute from './modules/booking/booking.routes';
const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/venues', venueRoutes);
router.use('/booking', bookingRoute);

export default router;
