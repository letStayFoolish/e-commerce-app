import { ICartState } from "../types";
import { addDecimals, setToLocalStorage } from "./";

export function updateCart(state: ICartState) {
  // Calculate items price
  const itemsPrice = state.cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty!;
  }, 0);

  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  const shippingPrice = !itemsPrice || itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate tax price (15%)
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  // Calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  state.totalPrice = addDecimals(totalPrice);

  setToLocalStorage("cart", state);

  return state;
}
