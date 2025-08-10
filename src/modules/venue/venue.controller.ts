import { Request, Response } from 'express';
import {
  assignSportsToVenueService,
  createVenueService,
  defineSlotsService,
  deleteVenueService,
  getAllVenuesService,
  getAvailableSlotsService,
  getMyVenuesService,
  getVenuesByIdService,
  updateVenueService,
} from './venue.service';

export const createVenueHandler = async (req: Request, res: Response) => {
  try {
    const venue = await createVenueService(req.user.id, req.body);
    res.status(201).json({ message: 'Venue created successfully', venue });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVenueByIdHandler = async (req: Request, res: Response) => {
  try {
    const venue = await getVenuesByIdService(req.params.id);

    if (!venue) {
      return res.status(404).json({ error: 'Venue not found' });
    }
    res.status(200).json({ message: 'Venue retrieved successfully', venue });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllVenuesHandler = async (req: Request, res: Response) => {
  try {
    const venues = await getAllVenuesService();
    res.status(200).json({ message: 'Venues retrieved successfully', venues });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyVenuesHandler = async (req: Request, res: Response) => {
  try {
    const venues = await getMyVenuesService(req.user.id);

    res.status(200).json({
      message: 'Venues of given user retrieved successfully',
      venues,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVenueHandler = async (req: Request, res: Response) => {
  try {
    const updatedVenue = await updateVenueService(
      req.params.id,
      req.user.id,
      req.body
    );
    res
      .status(200)
      .json({ message: 'Venue updated successfully', updatedVenue });
  } catch (error: any) {
    const statusCode = error.message.includes('Not authorized') ? 403 : 400;
    res.status(statusCode).json({ error: error.message });
  }
};

export const deleteVenueHandler = async (req: Request, res: Response) => {
  try {
    await deleteVenueService(req.params.id, req.user.id);
    res.status(200).json({ message: 'Venue deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const assignSportsToVenueHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedVenue = await assignSportsToVenueService(
      req.params.id,
      req.user.id,
      req.body.sportsIds
    );
    res
      .status(200)
      .json({ message: 'Sports assigned successfully', updatedVenue });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const defineSlotsHandler = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, slotDuration, date } = req.body;
    const venueId = req.params.id;
    const ownerId = (req as any).user.id; // Replace with your AuthRequest type later

    if (!startTime || !endTime || !slotDuration || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const slots = await defineSlotsService(
      venueId,
      startTime,
      endTime,
      slotDuration,
      ownerId,
      parsedDate
    );

    res.status(201).json({
      message: 'Slots defined successfully',
      slots,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAvailableSlotsHandler = async (req: Request, res: Response) => {
  try {
    const venueId = req.params.venueId;
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date is required' });
    }

    const result = await getAvailableSlotsService(venueId, date);

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
