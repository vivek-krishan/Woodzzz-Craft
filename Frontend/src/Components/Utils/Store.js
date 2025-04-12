import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CartInfoSlice from "./Slices/CartInfoSlice";
import ProductSlice from "./Slices/ProductSlice";
import Wishlist from "./Slices/WishListSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserInfoSlice,
    CartInfo: CartInfoSlice,
    ProductsList: ProductSlice,
    WishList: Wishlist,
  },
});

export default store;
