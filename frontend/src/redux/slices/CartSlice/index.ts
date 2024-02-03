// In here we are not dealing with endpoints and asynchronous requests, that is why we are using createSlice instead of createApi

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getFromLocalStorage,
  setToLocalStorage,
  updateCart,
} from "../../../utils";
import { CartState, ShippingAddress } from "./types";
import { IProduct } from "../../../types";

const initialState: CartState = getFromLocalStorage("cart")
  ? getFromLocalStorage("cart")!
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<IProduct>) {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      setToLocalStorage("cart", state);
    },

    removeItemFromCart(state: CartState, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      updateCart(state);
    },
    saveShippingAddress(
      state: CartState,
      action: PayloadAction<ShippingAddress>
    ) {
      state.shippingAddress = action.payload;
      setToLocalStorage("cart", state);
    },
  },
});

export const { addToCart, removeItemFromCart, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
