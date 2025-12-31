export const APP_ROUTES = {
  LANDING: "/",
  SIGN_IN: "signin",
  POLLS: "/polls",
  ADD_POLL: "/polls/add",
  EDIT_POLL: {
    PATH: "/polls/:pollSlug/edit",
    build: (pollSlug: string) => `/polls/${pollSlug}/edit`,
  },
  POLL_LINK: {
    PATH: "/polls/:pollSlug/link",
    build: (pollSlug: string) => `/polls/${pollSlug}/link`,
  },
  POLL_VIEW: {
    PATH: "/polls/:pollSlug/view",
    build: (pollSlug: string) => `/polls/${pollSlug}/view`,
  },
};
