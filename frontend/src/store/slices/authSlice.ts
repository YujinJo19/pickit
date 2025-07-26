import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet, axiosPost } from "../../services/api";

export const getUser: any = createAsyncThunk(
  "/auth",
  async (args: any, { rejectWithValue }) => {
    console.log("args=>", args);
    try {
      const response = await axiosGet(`/auth/${args.value}`);
      console.log("회원정보 가져오기 try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("회원정보 가져오기 catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

export const authLogin: any = createAsyncThunk(
  "/auth/login",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPost("/auth/login", args);
      console.log("로그인 try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("login catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

const authApiSlice = createSlice({
  name: "auth",
  initialState: 1,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authApiSlice.reducer;
