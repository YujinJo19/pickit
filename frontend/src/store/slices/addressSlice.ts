// store/slices/addressSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  getAddressList,
  createAddress,
  deleteAddresses,
  updateAddress,
  updateAddressDefault,
} from "../thunks/addressThunk";

interface AddressState {
  list: any[];
  loading: boolean;
}

const initialState: AddressState = {
  list: [],
  loading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddressList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddressList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteAddresses.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (addr) => !action.meta.arg.addressIds.includes(addr.id),
        );
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const idx = state.list.findIndex((a) => a.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateAddressDefault.fulfilled, (state, action) => {
        state.list.forEach((a) => {
          a.isDefault = a.id === action.payload.id;
        });
      });
  },
});

export default addressSlice.reducer;
