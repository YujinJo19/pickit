import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "../../services/user";

interface UpdateProfileImgArgs {
  userId: number;
  formData: FormData;
}

// 회원정보 조회
export const getUser = createAsyncThunk(
  "user/getUser",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await userAPI.getUser(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 회원탈퇴
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await userAPI.deleteUser(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 프로필 수정
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await userAPI.updateProfile(args.id, args.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 프로필 이미지 수정
export const updateProfileImg = createAsyncThunk(
  "user/updateProfileImg",
  async ({ userId, formData }: UpdateProfileImgArgs, { rejectWithValue }) => {
    try {
      const res = await userAPI.updateProfileImg(userId, formData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 프로필 이미지 삭제
export const deleteProfileImg = createAsyncThunk(
  "user/deleteProfileImg",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await userAPI.deleteProfileImg(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
