import { createSlice } from "@reduxjs/toolkit";

const ProductsList = createSlice({
  name: "ProductsList",
  initialState: {
    products: [],
  },
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addProducts, clearProducts } = ProductsList.actions;

export default ProductsList.reducer;
