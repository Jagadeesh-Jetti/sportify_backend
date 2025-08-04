import jwt, { SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: { id: string; role: string },
  expiresIn: SignOptions['expiresIn'] = '7d'
) => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, process.env.JWT_SECRET as string, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};
