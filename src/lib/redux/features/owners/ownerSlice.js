import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  page: 1,
};

const ownerSlice = createSlice({
  name: "owner",
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

export const { setCurrentPage, setSearchTerm } = ownerSlice.actions;

export default ownerSlice.reducer;
