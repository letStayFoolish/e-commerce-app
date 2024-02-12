function addDecimals(num) {
  return Math.round((num * 100) / 100).toFixed(2);
}

export function calcPrice(orderItem) {
  // Calculate items price
  const itemsPrice = orderItem.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  // Calculate shipping price (If order is over $100 then free, else $10 shipping)
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Calculate tax price (15%)
  const taxPrice = 0.15 * itemsPrice;

  // Calculate total price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // return prices as strings fixed to 2 decimal places

  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
}
