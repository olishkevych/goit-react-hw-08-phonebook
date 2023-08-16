import { createSlice } from '@reduxjs/toolkit';
import {
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk,
  refreshUserThunk,
} from '../operations';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loggedIn: false,
    token: null,
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(registerUserThunk.pending, handlePending)
      .addCase(loginUserThunk.pending, handlePending)
      .addCase(logoutUserThunk.pending, handlePending)
      .addCase(refreshUserThunk.pending, handlePending)
      .addCase(registerUserThunk.rejected, handleRejected)
      .addCase(loginUserThunk.rejected, handleRejected)
      .addCase(logoutUserThunk.rejected, handleRejected)
      .addCase(refreshUserThunk.rejected, handleRejected)
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.loggedIn = true;
        state.userData = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.loggedIn = false;
        state.userData = null;
        state.token = null;
      });
  },
});

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const userSliceReducer = userSlice.reducer;
