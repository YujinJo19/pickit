import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderAPI from "../../services/order";

// 주문 생성
export const makeOrder = createAsyncThunk(
  "order/makeOrder",
  async (args, { rejectWithValue }) => {
    try {
      const response = await orderAPI.makeOrder(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 주문 조회
export const getOrders = createAsyncThunk(
  "order/getOrders",
  async (args, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrders(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);

// 주문 상세 조회
export const getOrderItem = createAsyncThunk(
  "order/getOrderItem",
  async (args, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrderItem(args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  },
);
