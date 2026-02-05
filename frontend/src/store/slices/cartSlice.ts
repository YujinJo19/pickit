import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../thunks/cartThunk";

interface CartState {
  items: any[];
  totalPrice: number;
  loading: boolean;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
