// Auth:
export const SIGN_IN_API = '/auth/signin';
export const DEMO_SIGN_IN_API = '/auth/demo-signin';

// Polls:
export const POLLS_API = '/polls';
export const POLL_API = (pollId: string) => `/polls/${pollId}`;
export const POLL_VOTES_API = (pollId: string) => `/polls/${pollId}/votes`;
export const VOTE_API = '/polls/votes';
