import { createContext } from 'react';
import type { Poll } from '../../../../../../api/polls/polls.types';

export type PollViewContextType = {
  poll: Poll | undefined;
  alreadyVoted: boolean;
  submitLoading: boolean;
};

const defaultValue = {
  poll: undefined,
  alreadyVoted: false,
  submitLoading: false,
};

export const PollViewContext = createContext<PollViewContextType>(defaultValue);
