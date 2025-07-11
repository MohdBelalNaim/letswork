import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isComponentVisible: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    showComponent: (state) => {
      state.isComponentVisible = true;
    },
    hideComponent: (state) => {
      state.isComponentVisible = false;
    },
    toggleComponent: (state) => {
      state.isComponentVisible = !state.isComponentVisible;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { showComponent, hideComponent, toggleComponent, login, logout } =
  authSlice.actions;
export default authSlice.reducer;
