import { createSlice } from "@reduxjs/toolkit";
import { makeOrder, getOrders, getOrderItem } from "../thunks/orderThunk";

interface OrderState {
  orders: any[];
  orderDetail: any | null;
  loading: boolean;
}

const initialState: OrderState = {
  orders: [],
  orderDetail: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(makeOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getOrderItem.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      });
  },
});

export default orderSlice.reducer;
