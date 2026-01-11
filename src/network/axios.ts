/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants/api';

const token = localStorage.getItem('token');

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

// export const getMethod = async <T>(
//   url: string,
// ): Promise<AxiosResponse<T, any, {}>> => {
//   return axios.get<T>(API_BASE_URL + url, {
//     headers: defaultHeaders,
//   });
// };

// export const deleteMethod = async (
//   url: string,
// ): Promise<AxiosResponse<any, any, {}>> => {
//   return axios.delete(API_BASE_URL + url, {
//     headers: defaultHeaders,
//   });
// };

// export const postMethod = async <T>(
//   url: string,
//   data?: any,
// ): Promise<AxiosResponse<T, any, {}>> => {
//   return axios.post<T>(API_BASE_URL + url, data, {
//     headers: defaultHeaders,
//   });
// };

// export const putMethod = async <T>(
//   url: string,
//   data: any = {},
// ): Promise<AxiosResponse<T, any, {}>> => {
//   return axios.put<T>(API_BASE_URL + url, data, {
//     headers: defaultHeaders,
//   });
// };
