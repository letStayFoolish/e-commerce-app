import axios from "axios";
import { type IProduct } from "../types";
import { PRODUCTS_URL } from "../constants";

export async function getProductsAPI() {
  try {
    const response = await axios.get(PRODUCTS_URL);

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
