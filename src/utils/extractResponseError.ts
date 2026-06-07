import { DEFAULT_ERROR } from '../constants/errorMessages';

export const extractResponseError = (error: any) => {
  return error.response?.data?.message || DEFAULT_ERROR;
};
