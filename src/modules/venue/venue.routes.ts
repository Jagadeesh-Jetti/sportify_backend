import { Router } from 'express';
import {
  assignSportsToVenueHandler,
  createVenueHandler,
  defineSlotsHandler,
  deleteVenueHandler,
  getAllVenuesHandler,
  getAvailableSlotsHandler,
  getMyVenuesHandler,
  getVenueByIdHandler,
  updateVenueHandler,
} from './venue.controller';
import { requireAuth } from '../../middlewares/auth.middleware';
import { requireRole } from '../../middlewares/roles.middleware';

const router = Router();

router.post('/', requireAuth, requireRole(['MERCHANT']), createVenueHandler);
router.put('/:id', requireAuth, requireRole(['MERCHANT']), updateVenueHandler);
router.delete(
  '/:id',
  requireAuth,
  requireRole(['MERCHANT']),
  deleteVenueHandler
);
router.get('/me', requireAuth, requireRole(['MERCHANT']), getMyVenuesHandler);
router.post(
  '/:id/sports',
  requireRole(['MERCHANT']),
  assignSportsToVenueHandler
);
router.post('/:id/slots', requireRole(['MERCHANT']), defineSlotsHandler);

router.get('/', requireAuth, getAllVenuesHandler);
router.get('/:id', requireAuth, getVenueByIdHandler);
router.get('/:venueId/available-slots', requireAuth, getAvailableSlotsHandler);

export default router;
