import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export const createJWT = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });

    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({ message: 'not valid token' });

    return;
  }

  try {
    req['user'] = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (e) {
    console.error(e);

    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }
};
