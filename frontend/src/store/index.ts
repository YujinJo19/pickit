import { combineReducers } from "@reduxjs/toolkit";
import authApiSlice from "../store/slices/authSlice";

const rootReducer = combineReducers({
  authApi: authApiSlice,
});

export default rootReducer;
