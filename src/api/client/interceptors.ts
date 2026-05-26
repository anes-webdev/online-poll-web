import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { apiClient } from './axios';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAlert } from '../../hooks/useAlert';
import { authAction } from '../../store/slices/auth';
import { APP_ROUTES } from '../../constants/routes';

apiClient.interceptors.request.use((config) => {
  return config;
});

export const useAxiosInterceptors = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
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
  }, []);
};
