import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;
