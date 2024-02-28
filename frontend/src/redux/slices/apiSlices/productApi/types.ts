import { IProduct } from "../../../../types";

export type getProductsQuery = {
  products: IProduct[];
  page: number;
  pages: number;
};
