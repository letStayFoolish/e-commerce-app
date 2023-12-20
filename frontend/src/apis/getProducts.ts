import axios from "axios";
import { type IProduct } from "../types";

export async function getProductsAPI(): Promise<
  IProduct[] | string | Error | undefined
> {
  try {
    const response = await axios.get("/api/products");

    if (response.status === 200) {
      return response.data as IProduct[];
    } else {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error fetching products: ${error.message}`);
  }
}
