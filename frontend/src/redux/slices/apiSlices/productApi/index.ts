import { apiSlice } from "../index";
import { PRODUCTS_URL } from "../../../../constants";
import { type IProduct } from "../../../../types";
import { ObjectId } from "mongoose";

// slice where we have endpoints where we are dealing with asynchronous request

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

    getProductDetails: builder.query<IProduct, ObjectId | string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5, // in seconds
      //   providesTags: ["Product"],
    }),

    createProduct: builder.mutation<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // stop it from being cached - so we have fresh data. Without this, we would have to reload the page
    }),

    updateProduct: builder.mutation<IProduct[], Partial<IProduct>>({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"], // clear the cache
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
