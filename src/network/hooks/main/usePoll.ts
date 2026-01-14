// Add other requests
// Add api urls as constants

import type { CreatePollData } from '../../../schemas/pollSchema';
import {
  CREATE_POLL_API,
  DELETE_POLL_API,
  EDIT_POLL_API,
  GET_POLL_API,
  GET_POLL_LIST_API,
} from '../../api';
import { useApi } from '../useApi';

export type Poll = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  link: string;
  participantsCount: number;
  options: {
    id: number;
    optionName: string;
  }[];
};

export const usePoll = () => {
  const api = useApi();

  const getPolls = async (): Promise<Poll[]> => {
    const { data } = await api<Poll[]>('get', GET_POLL_LIST_API);
    return data;
  };

  const getPoll = async (pollSlug: string): Promise<Poll> => {
    const { data } = await api<Poll>('get', GET_POLL_API(pollSlug));
    return data;
  };

  const deletePoll = async (pollSlug: string): Promise<any> => {
    const { data } = await api('delete', DELETE_POLL_API(pollSlug));
    return data;
  };

  const createPoll = async (formData: CreatePollData): Promise<string> => {
    const { data } = await api<string>('post', CREATE_POLL_API, formData);
    return data;
  };

  const editPoll = async (
    pollSlug: string,
    formData: Partial<CreatePollData>,
  ): Promise<any> => {
    const { data } = await api('put', EDIT_POLL_API(pollSlug), formData);
    return data;
  };

  return { getPolls, getPoll, createPoll, deletePoll, editPoll };
};


