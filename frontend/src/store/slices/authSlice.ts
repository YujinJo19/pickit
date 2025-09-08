import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout } from "../thunks/authThunk";
import { getRoleFromToken } from "../../services/token";

interface AuthState {
  user: any;
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  loading: false,
  error: null,
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
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.role = null;
        state.loading = false;
        state.error = null;
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
      });
  },
});

export default authSlice.reducer;
