import { Request, Response } from 'express';
import * as userService from './user.service';

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const profile = await userService.getMyProfileService(userId);
    res.json(profile);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const updated = await userService.updateMyProfileService(
      req.user.id,
      req.body
    );
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
