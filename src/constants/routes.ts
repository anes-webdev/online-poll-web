export const APP_ROUTES = {
  LANDING: '/',
  SIGN_IN: 'signin',
  POLLS: '/polls',
  ADD_POLL: '/polls/add',
  EDIT_POLL: {
    PATH: '/polls/:pollId/edit',
    build: (pollId: string) => `/polls/${pollId}/edit`,
  },
  POLL_LINK: {
    PATH: '/polls/:pollId/link',
    build: (pollId: string) => `/polls/${pollId}/link`,
  },
  POLL_VIEW: {
    PATH: '/polls/:pollId/view',
    build: (pollId: string) => `/polls/${pollId}/view`,
  },
};
