import bcrypt from 'bcrypt';

import { User } from '../models/index.js';

export const createUser = async ({ userPayload }) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(userPayload.password, salt);
  const userObj = {
    fname: userPayload.fname,
    lname: userPayload.lname,
    email: userPayload.email,
    password: hash,
    userType: userPayload.userType,
  };
  const user = new User(userObj);
  await user.save();
  return user;
};
