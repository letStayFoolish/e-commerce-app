// In here we are not dealing with endpoints and asynchronous requests, that is why we are using createSlice instead of createApi

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getFromLocalStorage, updateCart } from "../../../utils";
import type { ICartState, IShippingAddress } from "./types";
import { IProduct } from "../../../types";

const initialState: ICartState = getFromLocalStorage("cart")
  ? getFromLocalStorage("cart")!
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: ICartState, action: PayloadAction<IProduct>) {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCart(state);
    },

    removeItemFromCart(state: ICartState, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      updateCart(state);
    },

    saveShippingAddress(
      state: ICartState,
      action: PayloadAction<IShippingAddress>
    ) {
      state.shippingAddress = action.payload;

      updateCart(state);
    },

    savePaymentMethod(state: ICartState, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;

      updateCart(state);
    },

    clearCartItems(state: ICartState) {
      state.cartItems = [];
      state.shippingPrice = "";
      state.paymentMethod = "";
      state.shippingAddress.address = "";
      state.shippingAddress.city = "";
      state.shippingAddress.postalCode = "";
      state.shippingAddress.country = "";

      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeItemFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
