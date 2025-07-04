import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isComponentVisible: false,
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
  },
});

export const { showComponent, hideComponent, toggleComponent } =
  authSlice.actions;
export default authSlice.reducer;
