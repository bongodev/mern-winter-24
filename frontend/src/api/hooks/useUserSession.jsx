import { authServices } from '../services';

export const useUserSession = () => {
  const userSession = authServices.getUserSessionObject();

  const logout = () => authServices.logout();

  return {
    userSession,
    logout,
  };
};
