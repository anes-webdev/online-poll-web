import {
  CREATE_POLL_API,
  DELETE_POLL_API,
  EDIT_POLL_API,
  GET_POLL_API,
  GET_POLL_LIST_API,
  VOTE_API,
} from '../endpoints';
import type { CreatePollData } from '../../schemas/pollSchema';
import { apiClient } from '../client/axios';
import type { Poll } from './polls.types';

export const getPolls = async (): Promise<Poll[]> => {
  const { data } = await apiClient.get<Poll[]>(GET_POLL_LIST_API);
  return data;
};

export const getPoll = async (pollSlug: string): Promise<Poll> => {
  const { data } = await apiClient.get<Poll>(GET_POLL_API(pollSlug));
  return data;
};

export const deletePoll = async (pollSlug: string): Promise<any> => {
  const { data } = await apiClient.delete(DELETE_POLL_API(pollSlug));
  return data;
};

export const createPoll = async (formData: CreatePollData): Promise<string> => {
  const { data } = await apiClient.post<string>(CREATE_POLL_API, formData);
  return data;
};

export const editPoll = async (
  pollSlug: string,
  formData: Partial<CreatePollData>,
): Promise<any> => {
  const { data } = await apiClient.put(EDIT_POLL_API(pollSlug), formData);
  return data;
};

export const registerVote = async (
  options: string,
  formData: { name: string },
): Promise<any> => {
  const { data } = await apiClient.post(VOTE_API(options), formData);
  return data;
};
