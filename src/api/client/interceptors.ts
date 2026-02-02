import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { apiClient } from './axios';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';
import { authAction } from '../../store/slices/auth';
import { APP_ROUTES } from '../../constants/routes';

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
