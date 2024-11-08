import axios from 'axios';

const LOGIN_BASE_URL = 'http://localhost:5000';
const SESSION_KEY = 'simple-e-commerce-session';

export const saveUserSession = (userSessionObject) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(userSessionObject));

export const getUserSessionObject = () =>
  JSON.parse(localStorage.getItem(SESSION_KEY));

export const isUserLoggedIn = () => Boolean(localStorage.getItem(SESSION_KEY));

export const getAccessToken = () => {
  const userSessionObject = getUserSessionObject();
  if (!userSessionObject) {
    return null;
  }
  return userSessionObject.accessToken;
};

export const getRefreshToken = () => getUserSessionObject()?.refreshToken;

export const login = async ({ email, password, type, refreshToken }) => {
  logout();
  const res = await axios.post(`${LOGIN_BASE_URL}/api/auth/login`, {
    email,
    password,
    type,
    refreshToken,
  });
  saveUserSession(res.data);
};

export const logout = () => localStorage.removeItem(SESSION_KEY);
