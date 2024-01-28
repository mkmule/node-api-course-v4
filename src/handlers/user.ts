import prisma from '../db';
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = await prisma.user.create({
      data: {
        username: payload.username,
        password: await hashPassword(payload.password),
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

export const signIn = async (req: Request, res: Response) => {
  const payload = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  const isValid = await comparePassword(payload.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: 'not authorized, nope' });
  }

  const token = createJWT(user);
  res.json({ token });
};
