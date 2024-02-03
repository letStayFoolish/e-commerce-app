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
