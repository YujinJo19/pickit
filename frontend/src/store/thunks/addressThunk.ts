import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addressAPI from "../../services/address";

// 배송지 생성
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await addressAPI.create(args.id, args.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 배송지 목록 조회
export const getAddressList = createAsyncThunk(
  "address/getAddressList",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await addressAPI.getList(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 배송지 삭제
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await addressAPI.del(args.id, args.addressId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 배송지 수정
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await addressAPI.update(
        args.id,
        args.addressId,
        args.data
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 기본 배송지 설정
export const updateAddressDefault = createAsyncThunk(
  "address/updateAddressDefault",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await addressAPI.updateDefault(args.id, args.addressId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
