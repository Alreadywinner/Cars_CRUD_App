import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  isLoading: boolean;
  error?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: '',
  isLoading: false,
  error: undefined,
};

type UserDataType = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: UserDataType) => {
    if (email === 'user@example.com' && password === 'password') {
      await AsyncStorage.setItem('token', email);
      return {email};
    } else {
      throw new Error('Invalid username/password');
    }
  },
);
export const register = createAsyncThunk(
  'auth/register',
  async ({email}: UserDataType) => {
    await AsyncStorage.setItem('token', email);
    return {email};
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('token');
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state) {
      state.isAuthenticated = false;
      state.email = '';
      state.isLoading = false;
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message ?? 'An error occurred.';
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
        state.email = '';
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.email = action.payload.email;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.error.message ?? 'An error occurred.';
        state.isLoading = false;
      });
  },
});
export const {resetState} = authSlice.actions;
export default authSlice.reducer;
