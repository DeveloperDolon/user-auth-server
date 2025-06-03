import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solid_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.static(
  'isUserExistByUsername',
  async function (username: string): Promise<TUser | null> {
    return await this.findOne({ username }).select('+password');
  },
);

userSchema.static(
  'isPasswordMatched',
  async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  },
);

export const User = model<TUser, UserModel>('User', userSchema);
