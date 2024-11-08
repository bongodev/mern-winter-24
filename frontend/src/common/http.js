import axios from 'axios';

import { authServices } from './auth';

const http = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  (config) => {
    const accessToken = authServices.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('session expired!!!');
    if (error.response.status === 401 && !error.config._retry) {
      const refreshToken = authServices.getRefreshToken();
      if (!refreshToken) {
        window.location.replace('/login');
      }
      await authServices.login({ refreshToken });
      const accessToken = authServices.getAccessToken();
      if (!accessToken) {
        window.location.replace('/login');
      }
      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

export { http };
