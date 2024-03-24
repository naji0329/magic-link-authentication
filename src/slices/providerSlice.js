import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provider: null,
};

export const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
    },

  },
});

export const { setProvider, } = providerSlice.actions;

export default providerSlice.reducer;
