import { apiSlice } from "../index";
import { ORDERS_URL, PAYPAL_URL } from "../../../../constants";
import type { IOrder } from "../../../../types";

// slice where we have endpoints where we are dealing with asynchronous request

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<IOrder, IOrder>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
    }),

    getOrderDetails: builder.query<IOrder, string>({
      query: (orderID) => ({
        url: `${ORDERS_URL}/${orderID}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // payOrder: builder.mutation<IOrder, { orderID: string; details: IOrder }>({
    payOrder: builder.mutation({
      query: ({ orderID, details }) => ({
        url: `${ORDERS_URL}/${orderID}/pay`,
        method: "PUT",
        body: { ...details },
      }),
    }),

    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} = ordersApiSlice;
