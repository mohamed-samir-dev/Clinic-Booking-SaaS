import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  role: string;
  clinicId?: string;
  specialty?: {
    en: string;
    ar?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    },
    loadUserFromStorage: (state) => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
          state.user = JSON.parse(storedUser);
          state.token = storedToken;
        }
      }
    },
  },
});

export const { setCredentials, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
