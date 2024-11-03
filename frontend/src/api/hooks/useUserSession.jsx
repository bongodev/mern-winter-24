import { authServices } from '../services';

export const useUserSession = () => {
  const userSession = authServices.getUserSessionObject();

  return {
    userSession,
  };
};
