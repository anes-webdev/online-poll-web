import { useNavigate } from 'react-router';
import { pollLinkAction } from '../store/slices/poll-link';
import { useAppDispatch } from './useAppDispatch';
import { APP_ROUTES } from '../constants/routes';
import { useAppSelector } from './useAppSelector';
import { useCallback } from 'react';

export const usePollLink = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDisplayed, message } = useAppSelector((state) => state.pollLink);

  const showPollLink = (pollId: string, message: string) => {
    dispatch(pollLinkAction.showPollLinkPage(message));
    navigate(APP_ROUTES.POLL_LINK.build(pollId));
  };
  const hidePollLink = useCallback(
    () => dispatch(pollLinkAction.hidePollLinkPage()),
    [dispatch],
  );
  return {
    showPollLink,
    hidePollLink,
    isPollLinkDisplayed: isDisplayed,
    pollLinkMessage: message,
  };
};
