import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../thunks/authThunk";
import { getRoleFromToken, getSellerIdFromToken } from "../../utils/token";
import {
  deleteProfileImg,
  getUser,
  updateProfileImg,
} from "../thunks/userThunk";

interface AuthState {
  user: any;
  role: string | null;
  loading: boolean;
  error: string | null;
  sellerId: number;
}

const initialRole =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_DEV_ACCESS_TOKEN
    ? getRoleFromToken(process.env.REACT_APP_DEV_ACCESS_TOKEN)
    : null;

const initialState: AuthState = {
  user: null,
  role: initialRole,
  loading: false,
  error: null,
  sellerId: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.role = getRoleFromToken(accessToken);
        state.sellerId = getSellerIdFromToken(accessToken);
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.loading = false;
        state.error = null;
        state.sellerId = 0;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProfileImg.fulfilled, (state, action) => {
        if (state.user) {
          state.user.profileImageUrl = action.payload.profileImageUrl;
        }
      })
      .addCase(deleteProfileImg.fulfilled, (state) => {
        if (state.user) {
          state.user.profileImageUrl = null;
        }
      });
  },
});

export default authSlice.reducer;
