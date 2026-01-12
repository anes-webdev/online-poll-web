import { useQuery } from '@tanstack/react-query';
import { usePoll } from '../main/usePoll';

export const useGetPolls = () => {
  const { getPolls } = usePoll();
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
