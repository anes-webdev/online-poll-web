import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { alertReducer } from './slices/alert';
// import { pollLinkReducer } from "./pollLink-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
