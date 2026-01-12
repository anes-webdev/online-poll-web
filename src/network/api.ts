export const GET_POLL_LIST_API = '/poll/find-all';
export const GET_POLL_API = (pollSlug: string) =>
  `/poll/find-by-link/${pollSlug}`;
export const CREATE_POLL_API = '/poll/create';
export const DELETE_POLL_API = (pollSlug: string) => `/poll/delete/${pollSlug}`;
export const EDIT_POLL_API = (pollSlug: string) => `/poll/edit/${pollSlug}`;
export const VOTE_API = (options: string) =>
  `/participant/create?selectedOptionsId=${options}`;

export const SIGN_IN_API = (username: string, password: string) =>
  `/user/signing?username=${username}&password=${password}`;
