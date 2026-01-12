import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const ALERT_DEFAULT_DELAY = 5000;
const DEFAULT_ERROR = 'Something went wrong';

export type AlertType = 'success' | 'error' | 'warning' | undefined;

type AlertState = {
  isDisplayed: boolean;
  message: string;
  type: AlertType;
  delay: number | undefined;
};

const initialState: AlertState = {
  isDisplayed: false,
  message: '',
  type: undefined,
  delay: undefined,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert(
      state,
      action: PayloadAction<{
        message: string;
        type: AlertType;
        delay?: number;
      }>,
    ) {
      const { message, type, delay } = action.payload;
      const showDefaultError = type === 'error' && !message;
      state.isDisplayed = true;
      state.type = type;
      state.message = showDefaultError ? DEFAULT_ERROR : message || '';
      state.delay = delay || ALERT_DEFAULT_DELAY;
    },
    hideAlert() {
      return initialState;
    },
  },
});

export const alertAction = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
