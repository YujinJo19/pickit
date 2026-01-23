import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cartAPI from "../../services/cart";

// 장바구니 조회
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (args, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCart(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 장바구니 추가
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (args, { rejectWithValue }) => {
    try {
      const response = await cartAPI.addCart(args);
      console.log(response, args);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 수량 변경
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { cartItemId, data }: { cartItemId: number; data: any },
    { rejectWithValue },
  ) => {
    try {
      const response = await cartAPI.updateQuantity(cartItemId, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 개별 삭제
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (args, { rejectWithValue }) => {
    try {
      const response = await cartAPI.deleteItem(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 전체 삭제
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (args, { rejectWithValue }) => {
    try {
      const response = await cartAPI.deleteAll(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);
