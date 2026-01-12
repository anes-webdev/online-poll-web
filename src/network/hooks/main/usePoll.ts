// Add other requests
// Add api urls as constants

import { useApi } from '../useApi';

type Poll = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  link: string;
  participantsCount: number;
};

export const usePoll = () => {
  const api = useApi();

  const getPolls = async (): Promise<Poll[]> => {
    const { data } = await api<Poll[]>('get', '/poll/find-all');
    return data;
  };

  const deletePoll = async (pollSlug?: string): Promise<any> => {
    const { data } = await api('delete', `/poll/delete/${pollSlug}`);
    return data;
  };

  return { getPolls, deletePoll };
};

// export const getPolls = async (): Promise<Poll[]> => {
//   const { data } = await api<Poll[]>('get', '/poll/find-all');
//   return data;
// };

// export const deletePoll = async (pollSlug?: string): Promise<any> => {
//   const { data } = await api('delete', `/poll/delete/${pollSlug}`);
//   return data;
// };
