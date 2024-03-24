import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  email: null,
  walletAddress: null,
  lastTime: 0,
  metadata: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMetadata: (state, action) => {
      state.metadata = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setWalletAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setLastTime: (state, action) => {
      state.lastTime = action.payload
    },
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.walletAddress = null;
    },
  },
});

export const { login, logout, setWalletAddress, setLastTime, setMetadata, setEmail } =
  authSlice.actions;

export default authSlice.reducer;
