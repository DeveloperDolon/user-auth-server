import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';

const loginUserFromDB = async (payload: TLogin) => {
  const { username, password, remember_me } = payload;

  const isUserExist = await User.isUserExistByUsername(username);

  if (!isUserExist) {
    throw new Error('User does not exist!');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Password is incorrect!');
  }

  const accessToken = jwtHelpers.generateToken(
    { username, password },
    config.jwt_secret as Secret,
    remember_me ? '7d' : '30m',
  );

  return {
    accessToken,
    user: isUserExist,
  };
};

const findUserFromDB = async (token: string) => {
  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt_secret as Secret,
  );

  if (!decodedToken) {
    throw new Error('Invalid token');
  }

  const user = await User.findOne({ username: decodedToken.username });

  return user;
};

export const AuthService = {
  loginUserFromDB,
  findUserFromDB,
};
