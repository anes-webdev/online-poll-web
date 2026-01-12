/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants/baseUrls';

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// });

export const api = async <T>(
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  url: string,
  data?: any,
): Promise<AxiosResponse<T, any, {}>> => {
  const token = localStorage.getItem('token');
  return axios({
    method: method,
    url: API_BASE_URL + url,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    data: data,
  });
};
