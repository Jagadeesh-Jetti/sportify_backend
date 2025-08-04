import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/roles.middleware';
import { getAdminDashboard, getAllUsersHandler } from './admin.controller';

const router = Router();

router.get(
  '/dashboard',
  requireAuth,
  requireRole(['ADMIN']),
  getAdminDashboard
);

router.get('/users', requireAuth, requireRole(['ADMIN']), getAllUsersHandler);
