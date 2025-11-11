import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "../../services/product";

// 내 상품 조회
export const getProduct = createAsyncThunk(
  "product/getMyProduct",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.getProduct(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 상품 상세 조회
export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.getProductDetail(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 상품 등록
export const createProduct = createAsyncThunk(
  "product/getMyProduct",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.createProduct(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 상품 수정
export const updateProduct = createAsyncThunk(
  "product/getMyProduct",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.updateProduct(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 상품 삭제
export const deleteProduct = createAsyncThunk(
  "product/getMyProduct",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.deleteProduct(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
