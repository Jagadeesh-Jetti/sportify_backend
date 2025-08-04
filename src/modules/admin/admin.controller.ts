import { getAdminDashboardService, getAllUsersService } from './admin.service';
import { Request, Response } from 'express';

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(201).json({ message: 'User retrieved successfully', users });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdminDashboard = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminDashboardService();
    res.json({ message: 'Stats retrieved successfully', stats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
