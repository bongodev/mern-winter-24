import { authServices } from '../../common/auth';

export const useUserSession = () => {
  const userSession = authServices.getUserSessionObject();

  const logout = () => authServices.logout();

  return {
    userSession,
    logout,
  };
};
