import { createSlice } from "@reduxjs/toolkit";

const CartInfo = createSlice({
  name: "cartInfo",
  initialState: {
    cart: {
      user: [],
      cartItems: [],
    },
  },
  reducers: {
    addCartUser: (state, action) => {
      state.cart.user.push(action.payload);
    },
    clearCartUser: (state) => {
      state.cart.user = [];
    },
    addCartItem: (state, action) => {
      state.cart.cartItems.push(action.payload);
    },
    clearCartItem: (state) => {
      state.cart.cartItems = [];
    },
  },
});

export const { addCartUser, clearCartUser, addCartItem, clearCartItem } =
  CartInfo.actions;

export default CartInfo.reducer;
