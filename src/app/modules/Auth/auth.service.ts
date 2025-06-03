import { Secret } from 'jsonwebtoken';
import config from '../../config';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import { User } from '../User/user.model';
import { TLogin } from './auth.interface';

const loginUserFromDB = async (payload: TLogin) => {
  const { username, password } = payload;

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
    config.jwt_access_token_expires_time as string,
  );

  return {
    accessToken,
    user: isUserExist,
  };
};

export const AuthService = {
  loginUserFromDB,
};
