import { apiSlice } from "../index";
import { PRODUCTS_URL, UPLOADS_URL } from "../../../../constants";
import type { IUpdatedProduct, IProduct } from "../../../../types";
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
      // providesTags: ["Products"],
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

    updateProduct: builder.mutation<IProduct[], IUpdatedProduct>({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: "PUT",
        body: product,
      }),
      // invalidatesTags: ["Products"], // clear the cache
    }),

    // uploadProductImage: builder.mutation<undefined, FormData>({
    uploadProductImage: builder.mutation<
      Promise<{ message: string; image: string }>,
      FormData
    >({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;
