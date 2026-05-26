import { POLL_API, POLL_VOTES_API, POLLS_API, VOTE_API } from '../endpoints';
import type { CreatePollData } from '../../schemas/pollSchema';
import { apiClient } from '../client/axios';
import type { Poll } from './polls.types';

export const getPolls = async (): Promise<Poll[]> => {
  const { data } = await apiClient.get<Poll[]>(POLLS_API);
  return data;
};

export const getPoll = async (pollSlug: string): Promise<Poll> => {
  const { data } = await apiClient.get<Poll>(POLL_API(pollSlug));
  return data;
};

export const getPollVotes = async (pollSlug: string): Promise<Poll> => {
  const { data } = await apiClient.get<Poll>(POLL_VOTES_API(pollSlug));
  return data;
};

export const createPoll = async (formData: CreatePollData): Promise<Poll> => {
  const { data } = await apiClient.post<Poll>(POLLS_API, formData);
  return data;
};

export const deletePoll = async (pollSlug: string): Promise<any> => {
  const { data } = await apiClient.delete(POLL_API(pollSlug));
  return data;
};

export const editPoll = async (
  pollSlug: string,
  formData: Partial<CreatePollData>,
): Promise<any> => {
  const { data } = await apiClient.put(POLL_API(pollSlug), formData);
  return data;
};

export const registerVote = async (formData: {
  participantName: string;
  optionIds: string[];
}): Promise<any> => {
  const { data } = await apiClient.post(VOTE_API, formData);
  return data;
};
