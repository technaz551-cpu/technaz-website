import { configureStore } from "@reduxjs/toolkit";
import { technazApi } from "@/store/api/technazApi";
import authReducer from "@/store/slices/authSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authReducer,
      [technazApi.reducerPath]: technazApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(technazApi.middleware),
  });
}

export const store = makeStore();
