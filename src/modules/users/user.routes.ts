import { Router } from 'express';
import {
  createUserHandler,
  getMyProfile,
  updateMyProfile,
} from './user.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { getPublicProfile } from './user.service';

const router = Router();

router.post('/', requireAuth, createUserHandler);
router.get('/me', requireAuth, getMyProfile);
router.patch('/me/password', requireAuth, updateMyProfile);

router.get('/:id', getPublicProfile);

export default router;
