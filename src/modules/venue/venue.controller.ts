import { Request, Response } from 'express';
import {
  createVenueService,
  deleteVenueService,
  getAllVenuesService,
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
    res.status(500).json({ error: error.message });
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

export const assignSportsToVenueHandler = () => {};

export const defineSlotsHandler = () => {};
