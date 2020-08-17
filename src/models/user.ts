/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uniqueRequiredMin6LengthString = {
  type: String,
  required: true,
  unique: true,
  minlength: [6, 'Minimum allowed length 6'],
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    username: uniqueRequiredMin6LengthString,
    email: uniqueRequiredMin6LengthString,
    password: uniqueRequiredMin6LengthString,
    age: Number,
    height: Number,
    weight: Number,
    description: String,
    avatar: Buffer,
    tokens: [
      {
        token: String,
      },
    ],
    exerciseListId: {
      type: Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User does not exist');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const isMatch = await bcrypt.compare(password, (user! as any).password);
  if (!isMatch) throw new Error('Unable to login');
  return user;
};

UserSchema.methods.generateAuthToken = async function () {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET!);
  if (this.tokens) {
    this.tokens = this.tokens.concat({ token });
  } else {
    this.tokens = token;
  }
  await this.save();
  return this;
};

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this as any).password = await bcrypt.hash(
      (this as any).password,
      bcrypt.genSaltSync(12)
    );
  }
  next();
});

UserSchema.pre('remove', async function (next) {
  // TODO delete exercise list
  next();
});

const User = model('User', UserSchema);

export default User;
