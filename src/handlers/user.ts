import prisma from '../db';
import { Request, Response } from 'express';
import { createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await prisma.user.create({
    data: {
      username: payload.username,
      password: await hashPassword(payload.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};
