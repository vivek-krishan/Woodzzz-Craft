import { createSlice } from "@reduxjs/toolkit";

const ProductsList = createSlice({
  name: "ProductsList",
  initialState: {
    products: null,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = null;
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    }
  },
});

export const { addProducts, clearProducts, updateProduct } = ProductsList.actions;

export default ProductsList.reducer;
