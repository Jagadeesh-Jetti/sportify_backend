import { Request, Response } from 'express';
import * as authService from './auth.service';
import { generateToken } from '../../utils/jwt';

export const signupHandler = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const finalRole = role === 'MERCHANT' ? 'MERCHANT' : 'USER';

    const { user, token } = await authService.signup(
      name,
      email,
      password,
      finalRole
    );

    res
      .status(201)
      .json({ message: 'Signup successful', token, role: user.role });
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
