import { http } from '../../common/http';

const SESSION_KEY = 'simple-e-commerce-session';

export const saveUserSession = (userSessionObject) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(userSessionObject));

export const getUserSessionObject = () =>
  JSON.parse(localStorage.getItem(SESSION_KEY));

export const isUserLoggedIn = () => Boolean(localStorage.getItem(SESSION_KEY));

export const login = ({ email, password, type }) =>
  http.post('/api/auth/login', { email, password, type });

export const logout = () => localStorage.removeItem(SESSION_KEY);
