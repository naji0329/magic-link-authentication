import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import providerReducer from "./slices/providerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    provider: providerReducer,
  },
});

export default store;
