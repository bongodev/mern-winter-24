import { authServices } from '../services/index.js';

export const login = async (req, res) => {
  try {
    const { type, email, password, refreshToken } = req.body;
    const signedUser = await authServices.login({
      type,
      email,
      password,
      refreshToken,
    });
    res.status(200).json(signedUser);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
