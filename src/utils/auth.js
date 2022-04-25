import jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../error/not-authorized-error';

export const verifyUser = (encoded) => {
  try {
    const { iat: _, ...user } = jwt.verify(encoded, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new NotAuthorizedError();
  }
};

export const signUser = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
