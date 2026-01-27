import { SIGN_IN_API } from '../../api';
import { useApi } from '../useApi';

// Todo: Remove this hook
// Organize network folder

export const useSignIn = () => {
  const api = useApi();

  const signIn = async (
    username: string,
    password: string,
  ): Promise<string> => {
    const { data } = await api<string>('post', SIGN_IN_API(username, password));
    return data;
  };

  return { signIn };
};
