import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  return auth;
};
