import { http } from '../../common/http';

export const createUser = async (userPayload) =>
  http.post('/api/users', userPayload);
