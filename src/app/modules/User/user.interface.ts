import { Model } from 'mongoose';

export interface TUser {
  id: string;
  username: string;
  password: string;
  shopNames: string[];
}

export interface UserModel extends Model<TUser> {
  isUserExistByUsername(username: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
