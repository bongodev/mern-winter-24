import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { config } from '../config.js';
import { User } from '../models/index.js';

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      userType: user.userType,
    },
    config.JWT_SECRET,
    {
      expiresIn: '20s',
    }
  );
  const refreshToken = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      userType: user.userType,
    },
    config.JWT_SECRET,
    {
      expiresIn: '5m',
    }
  );
  return { accessToken, refreshToken };
};

const generateUserObject = (user) => {
  const { accessToken, refreshToken } = generateTokens(user);

  const userObj = user.toJSON();
  delete userObj.password;
  userObj['accessToken'] = accessToken;
  userObj['refreshToken'] = refreshToken;
  return userObj;
};

const handleRefreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, config.JWT_SECRET);
  const user = await User.findById(payload._id);
  if (!user) {
    throw new Error('Unauthorized token!');
  }
  return generateUserObject(user);
};

const handleEmailLogin = async ({ password, user }) => {
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  return generateUserObject(user);
};

export const login = async ({ type, email, password, refreshToken }) => {
  if (type == 'email') {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User not found');
    }
    return handleEmailLogin({ password, user });
  } else {
    // Login using refresh token
    if (!refreshToken) {
      throw new Error('Refresh token is not defined');
    }
    return handleRefreshToken(refreshToken);
  }
};
