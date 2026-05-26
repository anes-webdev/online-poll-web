import { createSlice } from '@reduxjs/toolkit';

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: isAuthenticated,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      localStorage.setItem('isAuthenticated', 'true');
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.setItem('isAuthenticated', 'false');
      state.isAuthenticated = false;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
