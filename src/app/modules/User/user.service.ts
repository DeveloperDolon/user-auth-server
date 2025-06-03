import { TUser } from './user.interface';
import { User } from './user.model';

const signup = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

export const UserService = { signup };
