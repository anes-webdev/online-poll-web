import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
// import { modalReducer } from "./modal-slice";
// import { alertReducer } from "./alert-slice";
// import { pollLinkReducer } from "./pollLink-slice";


const store = configureStore({
  reducer: {
    auth: authReducer,
    // modal: modalReducer,
    // alert: alertReducer,
    // pollLink: pollLinkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
