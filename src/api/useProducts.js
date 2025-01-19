import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export function useProducts() {
  const [searchParams] = useSearchParams();
  
  // Get the 'page' query parameter or default to 1 if not available
  const page = Number(searchParams.get("page") || 1);
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/product/products?page=${page}&pageSize=10`);
        return response.data;  
      } catch (err) {
        throw new Error(err.response?.data?.message || "An error occurred while fetching products.");
      }
    },
  });

  // Extract useful data or default to empty values if no data is fetched
  const { products = [], pageSize = 10, totalProducts = 0, currentPage = 1 } = data || {};

  return { isLoading, error, products, pageSize, totalProducts, currentPage };
}
