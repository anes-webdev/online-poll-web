import { SIGN_IN_API } from '../endpoints';
import { apiClient } from '../client/axios';

export const signIn = async (
  username: string,
  password: string,
): Promise<string> => {
  const { data } = await apiClient.post<string>(
    SIGN_IN_API(username, password),
  );
  return data;
};
