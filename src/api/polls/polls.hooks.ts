import { useQuery } from '@tanstack/react-query';
import { getPoll } from '../polls/polls.api';
import type { Poll } from '../polls/polls.types';
import { getPolls } from '../polls/polls.api';

export const useGetPoll = (pollSlug: string, enabled: boolean = true) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['poll'],
    queryFn: async (): Promise<Poll> => await getPoll(pollSlug),
  });
};

export const useGetPolls = () => {
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
