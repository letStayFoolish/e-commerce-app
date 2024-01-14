// In here we are not dealing with endpoints and asynchronous requests, that is why we are using createSlice instead of createApi

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";
import { updateCart } from "./updateCart";
import { getFromLocalStorage } from "../../../utils/handleLocalstorage";

export interface CartState {
  cartItems: IProduct[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

const initialState: CartState = getFromLocalStorage("cart")
  ? JSON.parse(getFromLocalStorage("cart")!)
  : { cartItems: [] };

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

      updateCart(state);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItemFromCart(state: CartState, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      updateCart(state);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeItemFromCart } = cartSlice.actions;

export default cartSlice.reducer;
