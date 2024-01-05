import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

export type ProductsState = {
  products: Product[];
  isLoading: boolean;
  isError: string;
};

export type Product = {
  _id: ObjectId | string;
  user: ObjectId | string;
  name: string;
  image: string;
  origin: string;
  type: string;
  description: string;
  //   reviews: number,
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
};

const initialState: ProductsState = {
  products: [],
  isLoading: true,
  isError: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProductsSliceStart(state: ProductsState) {
      state.isLoading = true;
      state.isError = "";
    },
    getAllProductsSliceSuccess(
      state: ProductsState,
      action: PayloadAction<Product[]>
    ) {
      console.log("SLICE ACTION: ", action.payload);
      state.isLoading = false;
      state.products = action.payload;
    },
    getAllProductsSliceFailure(
      state: ProductsState,
      action: PayloadAction<string>
    ) {
      state.isLoading = false;
      state.isError = action.payload || "Error while fetching data";
    },
  },
});

export const {
  getAllProductsSliceStart,
  getAllProductsSliceSuccess,
  getAllProductsSliceFailure,
} = productsSlice.actions;

export default productsSlice.reducer;
