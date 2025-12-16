import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productAPI from "../../services/product";

// 전체 상품 조회
export const getProduct = createAsyncThunk(
  "product/getProduct",
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

// 카테고리별 상품 조회
export const getProductByCategory = createAsyncThunk(
  "product/getProductByCategory",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.productByCategory(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 상품 검색
export const getSearchedProduct = createAsyncThunk(
  "product/getSearchedProduct",
  async (args: any, { rejectWithValue }) => {
    try {
      const res = await productAPI.searchedProduct(args);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);
