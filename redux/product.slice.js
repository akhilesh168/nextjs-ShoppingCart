import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  initialState: [],
  name: "products",
  reducers: {
    getAllProduct: (state, action) => {
      if (state.length === 0) {
        state.push(...action.payload);
      }
    },
    getProductByCategory: (state, action) => {
      return state.filter((item) => item.key !== action.payload);
    },
  },
});

export const productReducer = productSlice.reducer;

export const { getAllProduct, getProductByCategory } = productSlice.actions;
