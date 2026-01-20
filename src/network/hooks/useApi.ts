/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../constants/baseUrls';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { authAction } from '../../store/slices/auth';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useAlert } from '../../hooks/useAlert';

export const useApi = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAuth();
  const alert = useAlert();

  const api = async <T>(
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
    })
      .then((res) => res)
      .catch((error: AxiosError) => {
        const { code, message, response } = error;
        if (error.status === 403) {
          dispatch(authAction.logout());
          navigate(APP_ROUTES.LANDING);
          alert('Session expired. Please sign in again to continue.', 'error');
        }
        throw new AxiosError(message, code, undefined, undefined, response);
      });
  };
  return api;
};
