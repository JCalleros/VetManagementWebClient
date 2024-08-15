import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  page: 1,
};

const patientSlice = createSlice({
  name: "patient",
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

export const { setCurrentPage, setSearchTerm } = patientSlice.actions;
export default patientSlice.reducer;
