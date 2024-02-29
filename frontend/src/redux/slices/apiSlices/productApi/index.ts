import { apiSlice } from "../index";
import { PRODUCTS_URL, UPLOADS_URL } from "../../../../constants";
import type { IUpdatedProduct, IProduct, IReviews } from "../../../../types";
import { ObjectId } from "mongoose";
import { getProductsQuery } from "./types";

// slice where we have endpoints where we are dealing with asynchronous request

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      getProductsQuery,
      { keyword: string; pageNumber: string }
    >({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5, // in seconds
      providesTags: ["Product"],
    }),

    getProductDetails: builder.query<IProduct, ObjectId | string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5, // in seconds
      providesTags: ["Product"],
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
      invalidatesTags: ["Product"], // clear the cache
    }),

    uploadProductImage: builder.mutation<
      Promise<{ message: string; image: string }>,
      FormData
    >({
      query: (data) => ({
        url: UPLOADS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"], // clear the cache
    }),

    deleteProduct: builder.mutation<IProduct, ObjectId>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // clear the cache
    }),

    createProductReview: builder.mutation<Promise<void>, IReviews>({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}/reviews`,
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    getTopProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
