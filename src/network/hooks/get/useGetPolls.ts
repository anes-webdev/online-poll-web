import { useQuery } from '@tanstack/react-query';
import { getPolls } from '../main/Poll';

export const useGetPolls = () => {
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
