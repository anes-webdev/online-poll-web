import { DEMO_SIGN_IN_API, SIGN_IN_API } from '../endpoints';
import { apiClient } from '../client/axios';

export const signIn = async (
  username: string,
  password: string,
): Promise<string> => {
  const { data } = await apiClient.post<string>(SIGN_IN_API, {
    username,
    password,
  });
  return data;
};

export const demoSignIn = async (): Promise<string> => {
  const { data } = await apiClient.post<string>(DEMO_SIGN_IN_API);
  return data;
};
