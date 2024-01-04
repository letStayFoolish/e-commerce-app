// In here we are not dealing with endpoints and asynchronous requests, that is why we are using createSlice instead of createApi

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";
import { updateCart } from "./updateCart";

export interface InitialState {
  cartItems: IProduct[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

const initialState: InitialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state: InitialState, action: PayloadAction<IProduct>) {
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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
