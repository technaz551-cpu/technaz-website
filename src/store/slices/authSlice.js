import { createSlice } from "@reduxjs/toolkit";
import { technazApi } from "@/store/api/technazApi";

const initialState = {
  admin: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.admin = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(technazApi.endpoints.login.matchFulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addMatcher(technazApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addMatcher(technazApi.endpoints.getMe.matchRejected, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
      })
      .addMatcher(technazApi.endpoints.logout.matchFulfilled, (state) => {
        state.admin = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
