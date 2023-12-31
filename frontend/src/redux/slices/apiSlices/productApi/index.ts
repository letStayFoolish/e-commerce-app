import { apiSlice } from "../index";
import { PRODUCTS_URL } from "../../../../constants";
import { type IProduct } from "../../../../types";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // FIXME: define types for query: <IProducts[], void> or what else you should use later inside component...
    getProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // in seconds
      //   providesTags: ["Product"],
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5, // in seconds
      //   providesTags: ["Product"],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
