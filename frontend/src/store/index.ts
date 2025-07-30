import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../store/slices/authSlice";

const rootReducer = combineReducers({
  authApi: authSlice,
});

export default rootReducer;
