import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import cartReducer from "../store/slices/cartSlice";
import orderReducer from "../store/slices/orderSlice";
import addressReducer from "../store/slices/addressSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  address: addressReducer,
});

export default rootReducer;
