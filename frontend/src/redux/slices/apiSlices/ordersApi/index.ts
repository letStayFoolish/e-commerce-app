import { apiSlice } from "../index";
import { ORDERS_URL } from "../../../../constants";

// slice where we have endpoints where we are dealing with asynchronous request

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
        // body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
