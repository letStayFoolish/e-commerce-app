import { CartState } from "../redux/slices/CartSlice/types";
import { addDecimals } from "./";

export function updateCart(state: CartState) {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty!;
    }, 0)
  );
  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
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

  return state;
}
