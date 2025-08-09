import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "../../services/auth";

// 회원정보 조회
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await authAPI.getUser(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  "auth/login",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 중복 확인
export const emailCheck: any = createAsyncThunk(
  "auth/emailcheck",
  async (args: any, { rejectWithValue }) => {
    console.log(args);

    try {
      const response = await authAPI.emailCheck(args);
      console.log("emailcheck try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("emailcheck catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);

// 이메일 인증 번호 전송
export const sendCode: any = createAsyncThunk(
  "auth/codeSend",
  async (args: any, { rejectWithValue }) => {
    console.log(args);

    try {
      const response = await authAPI.sendCode(args);
      console.log("emailcodesend try =>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("emailcodesend catch =>", err.response);
      return rejectWithValue(err.response);
    }
  }
);
// 이메일 인증 확인
export const verifyCode: any = createAsyncThunk(
  "auth/codeVerify",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyCode(args);
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
      const response = await authAPI.signup(args.data);
      console.log("signup try=>", response.data);
      return response.data;
    } catch (err: any) {
      console.log("signup catch=>", err.response);
      return rejectWithValue(err.response);
    }
  }
);
