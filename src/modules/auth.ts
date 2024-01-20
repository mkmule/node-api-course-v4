import jwt from 'jsonwebtoken';

export const createJWT = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
};
