import { Request, Response } from 'express';
import * as authService from './auth.service';

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.signup(req.body);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
