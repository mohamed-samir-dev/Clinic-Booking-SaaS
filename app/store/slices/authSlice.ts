import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  phone?: string;
  role: string;
  clinicId?: string;
  specialty?: {
    en: string;
    ar?: string;
  };
  dateOfBirth?: string;
  gender?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string[];
  chronicConditions?: string[];
  chronicConditionsOther?: string;
  currentMedications?: Array<{
    name: string;
    dosage: string;
    frequency: string;
    notes: string;
  }>;
  notesForDoctor?: string;
  medicalHistory?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const linkGuestAppointments = createAsyncThunk(
  'auth/linkGuestAppointments',
  async ({ token, user }: { token: string; user: User }) => {
    const guestId = localStorage.getItem('guestId');
    if (!guestId || user.role !== 'patient') return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/link-guest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          guestId,
          email: user.email,
          phone: user.phone
        })
      });

      if (response.ok) {
        localStorage.removeItem('guestId');
      }
    } catch {
      // Silent fail for guest linking
    }
  }
);

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
