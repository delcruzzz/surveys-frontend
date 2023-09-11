import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, AuthUserResponse } from '../interfaces/authInterface';

const initialState: AuthState = {
  isLoading: false,
  token: null,
  isAuthenticated: false,
  error: null,
  user: {
    id: 0,
    name: '',
    identityCard: '',
    cellPhoneNumber: '',
    roles: [],
    token: '',
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUserResponse>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.token; // Accede a la propiedad 'token' del payload
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
