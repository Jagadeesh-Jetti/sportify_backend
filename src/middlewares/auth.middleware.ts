import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ error: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { id: string; role: string };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
