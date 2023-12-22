import { useEffect, useState } from "react";
import type { IProduct } from "../types";
import { getProductsAPI } from "../apis/getProducts";

export function useProducts(): [IProduct[], boolean, () => void] {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProductsAPI();

      if (fetchedProducts && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      //   if (error instanceof Error) console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return [products, loading, fetchProducts];
}
