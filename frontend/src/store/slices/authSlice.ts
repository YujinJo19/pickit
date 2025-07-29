import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet, axiosPost } from "../../services/api";

//  회원정보 조회
export const getUser: any = createAsyncThunk(
  "/auth",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosGet(`/auth/${args.value}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 로그인
export const authLogin: any = createAsyncThunk(
  "auth/login",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPost("/auth/login", args);
      console.log("login try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("login catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 중복 확인
export const authEmailCheck: any = createAsyncThunk(
  "auth/emailcheck",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosGet("/email/check", {
        email: args,
      });
      console.log("emailcheck try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("emailcheck catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증 번호 전송
export const authCodeSend: any = createAsyncThunk(
  "auth/codeSend",
  async (args: any, { rejectWithValue }) => {
    console.log(args);

    try {
      const response = await axiosPost("/email/send", args);
      console.log("emailcodesend try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("emailcodesend catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);
// 이메일 인증 확인
export const authCodeVerify: any = createAsyncThunk(
  "auth/codeVerify",
  async (args: any, { rejectWithValue }) => {
    console.log(args);

    try {
      const response = await axiosPost("/email/verify", args);
      console.log("codeVerify try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("codeVerify catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

// 회원가입
export const signup: any = createAsyncThunk(
  "auth/signup",
  async (args: any, { rejectWithValue }) => {
    console.log("args=>", args);
    try {
      const response = await axiosPost("/auth/signup", args);
      console.log("signup try=>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("signup catch=>", err.response);
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
