import { useQuery } from '@tanstack/react-query';
import { getPoll, type Poll } from '../main/Poll';

export const useGetPoll = (pollSlug: string, enabled: boolean = true) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['poll'],
    queryFn: async (): Promise<Poll> => await getPoll(pollSlug),
  });
};
