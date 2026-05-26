import { useQuery } from '@tanstack/react-query';
import { getPoll, getPollVotes } from '../polls/polls.api';
import type { Poll } from '../polls/polls.types';
import { getPolls } from '../polls/polls.api';
// Todo: Change pollSlug to pollId: globally
// Todo: Change all error handlings: globally
// Todo: Change optionName to name

export const useGetPoll = (pollSlug: string, enabled: boolean = true) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['poll', pollSlug],
    queryFn: async (): Promise<Poll> => await getPoll(pollSlug),
  });
};

export const useGetPollVotes = (pollSlug: string) => {
  return useQuery({
    queryKey: ['pollVotes', pollSlug],
    queryFn: async (): Promise<Poll> => await getPollVotes(pollSlug),
  });
};

export const useGetPolls = () => {
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
