import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addressAPI from "../../services/address";

// 배송지 생성
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await addressAPI.create(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
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
  },
);

// 배송지 삭제
export const deleteAddresses = createAsyncThunk(
  "address/deleteAddresses",
  async (
    { id, addressIds }: { id: number; addressIds: number[] },
    { rejectWithValue },
  ) => {
    try {
      console.log(id, addressIds);

      const response = await addressAPI.del(id, addressIds);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 배송지 수정
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (
    { id, addressId, data }: { id: number; addressId: number; data: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await addressAPI.update(id, addressId, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 기본 배송지 설정
export const updateAddressDefault = createAsyncThunk(
  "address/updateAddressDefault",
  async (
    { id, addressId }: { id: number; addressId: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await addressAPI.updateDefault(id, addressId);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);
