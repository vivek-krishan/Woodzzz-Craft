import { configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "./Slices/UserInfoSlice";
import CartInfoSlice from "./Slices/CartInfoSlice";

const store = configureStore({
  reducer: {
    UserInfo: UserInfoSlice,
    CartInfo: CartInfoSlice,
  },
});

export default store;
