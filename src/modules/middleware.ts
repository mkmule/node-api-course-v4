import { validationResult } from 'express-validator';
import { NextFunction, Response } from 'express';

export const handleInputErrors = (req, res, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};
