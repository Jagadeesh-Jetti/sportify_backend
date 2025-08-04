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

export const getAllUsersHandler = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(201).json({ message: 'User retrieved successfully', users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
