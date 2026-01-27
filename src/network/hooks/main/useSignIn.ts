import { SIGN_IN_API } from '../../api';
import { apiClient } from '../../axios';

// Todo:Organize network folder

export const signIn = async (
  username: string,
  password: string,
): Promise<string> => {
  const { data } = await apiClient.post<string>(
    SIGN_IN_API(username, password),
  );
  return data;
};
