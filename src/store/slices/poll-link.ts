import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type PollLinkState = {
  message: string;
  isDisplayed: boolean;
};

const initialState: PollLinkState = {
  message: '',
  isDisplayed: false,
};

const pollLinkState = createSlice({
  name: 'pollLink',
  initialState,
  reducers: {
    showPollLinkPage(state, action: PayloadAction<string>) {
      state.message = action.payload;
      state.isDisplayed = true;
    },
    hidePollLinkPage() {
      return initialState;
    },
  },
});

export const pollLinkAction = pollLinkState.actions;
export const pollLinkReducer = pollLinkState.reducer;
