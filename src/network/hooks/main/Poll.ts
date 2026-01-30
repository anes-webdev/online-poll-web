import type { CreatePollData } from '../../../schemas/pollSchema';
import {
  CREATE_POLL_API,
  DELETE_POLL_API,
  EDIT_POLL_API,
  GET_POLL_API,
  GET_POLL_LIST_API,
  VOTE_API,
} from '../../api';
import { apiClient } from '../../axios';

// Todo: move these types into separate file:

export type Option = {
  id: number;
  optionName: string;
  participants?: Participant[];
};

export type Participant = {
  id: number;
  name: string;
  choices: Option[];
};

export type Poll = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  link: string;
  participants: Participant[];
  options: Option[];
};

// Todo: Refactor, or use something else instead of imports:

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
