import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCurrentPage } = patientSlice.actions;
export default patientSlice.reducer;
