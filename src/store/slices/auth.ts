import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialToken = localStorage.getItem('token');

type Token = string | null;

type AuthState = {
  token: Token;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Token>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload as string);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const authAction = authSlice.actions;
export const authReducer = authSlice.reducer;
