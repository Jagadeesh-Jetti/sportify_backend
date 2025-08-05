import { Router } from 'express';
import userRoutes from './modules/users/user.routes';
import authRoutes from './modules/auth/auth.routes';
import venueRoutes from './modules/venue/venue.routes';
const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/venues', venueRoutes);

export default router;
