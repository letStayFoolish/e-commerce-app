// In here we are not dealing with endpoints and asynchronous requests, that is why we are using createSlice instead of createApi

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types";
import { addDecimals } from "../../../utils/addDecimals";

export interface InitialState {
  cartItems: IProduct[];
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

const initialState: InitialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
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

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => {
          return acc + item.price * item.qty!;
        }, 0)
      );
      // Calculate shipping price (If order is over $100 then free, else $10 shipping)
      state.shippingPrice = addDecimals(
        Number(state.itemsPrice) > 100 ? 0 : 10
      );
      // Calculate tax price (15%)
      state.taxPrice = addDecimals(
        Number((0.15 * Number(state.itemsPrice)).toFixed(2))
      );
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
