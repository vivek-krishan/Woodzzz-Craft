import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CartInfoSlice from "./Slices/CartInfoSlice";
import ProductSlice from "./Slices/ProductSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserInfoSlice,
    CartInfo: CartInfoSlice,
    ProductsList: ProductSlice,
  },
});

export default store;
