import { useQuery } from '@tanstack/react-query';
import { getPoll, getPollVotes } from '../polls/polls.api';
import type { Poll } from '../polls/polls.types';
import { getPolls } from '../polls/polls.api';
// Todo: Change pollId to pollId: globally
// Todo: Change all error handlings: globally
// Todo: Change optionName to name

export const useGetPoll = (pollId: string, enabled: boolean = true) => {
  return useQuery({
    enabled: enabled,
    queryKey: ['poll', pollId],
    queryFn: async (): Promise<Poll> => await getPoll(pollId),
  });
};

export const useGetPollVotes = (pollId: string) => {
  return useQuery({
    queryKey: ['pollVotes', pollId],
    queryFn: async (): Promise<Poll> => await getPollVotes(pollId),
  });
};

export const useGetPolls = () => {
  return useQuery({
    queryKey: ['polls'],
    queryFn: getPolls,
  });
};
