import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../constants/baseUrls';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useAlert } from '../hooks/useAlert';
import { useEffect } from 'react';
import { APP_ROUTES } from '../constants/routes';
import { authAction } from '../store/slices/auth';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const useAxiosInterceptors = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAuth();
  const alert = useAlert();

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 403) {
          dispatch(authAction.logout());
          navigate(APP_ROUTES.LANDING);
          alert('Session expired. Please sign in again to continue.', 'error');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
};
