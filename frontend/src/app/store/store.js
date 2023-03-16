import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { authApiSlice } from "../../Feature/authApiSlice/authApiSlice";

import authReducer from "../../Feature/auth/authSlice";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
