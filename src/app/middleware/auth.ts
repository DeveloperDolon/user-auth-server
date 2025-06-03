import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import { jwtHelpers } from '../helpers/jwtHelpers';
import config from '../config';
import { Secret } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const auth = () => {
  return async (
    req: Request & { user?: unknown },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt_secret as Secret
      );

      req.user = verifiedUser;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;