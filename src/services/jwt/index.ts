import { apiUrl } from '../../constants';
import axios from '../axios';
import type { AxiosResponse } from 'axios';

export const jwtAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

jwtAxios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  (err: any) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
    }
    return Promise.reject(err);
  }
);
export const setAuthToken = (token?: string) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('auth', token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    localStorage.removeItem('auth');
  }
};
