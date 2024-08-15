import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  page: 1,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCurrentPage, setSearchTerm } = appointmentSlice.actions;
export default appointmentSlice.reducer;
