import { createSlice } from "@reduxjs/toolkit";

const WishList = createSlice({
  name: "WishList",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addWishlist: (state, action) => {
      const index = state.wishlist.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index === -1) state.wishlist.push(action.payload);
    },
    popFromWishlist: (state, action) => {
      const index = state.wishlist.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index != -1) state.wishlist.splice(index, 1);
    },
    clearWishlist: (state) => {
      state.wishlist = null;
    },
  },
});

export const { addWishlist, popFromWishlist, clearWishlist, setWishlist } =
  WishList.actions;

export default WishList.reducer;
