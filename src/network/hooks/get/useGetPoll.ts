import { useQuery } from '@tanstack/react-query';
import { usePoll, type Poll } from '../main/usePoll';

export const useGetPoll = (pollSlug: string, enabled: boolean) => {
  const { getPoll } = usePoll();
  return useQuery({
    enabled: enabled,
    queryKey: ['poll'],
    queryFn: async (): Promise<Poll> => await getPoll(pollSlug),
  });
};
