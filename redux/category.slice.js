import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  initialState: [],
  name: "categories",
  reducers: {
    getAllCategory: (state, action) => {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
  },
});

export const categoryReducer = categorySlice.reducer;

export const { getAllCategory } = categorySlice.actions;
