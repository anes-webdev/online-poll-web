import { useQuery } from '@tanstack/react-query';
import { getPolls } from '../polls';

export const usePolls = () => {
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
