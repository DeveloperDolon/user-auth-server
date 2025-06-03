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

  
};

export const AuthService = {
  loginUserFromDB,
};
