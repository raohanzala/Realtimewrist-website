import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export function useProducts() {

  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["products", page],
    queryFn: (page = 1, pageSize = 10) => {
        const response = axiosInstance.get(
          `/product/products?page=${page}&pageSize=${pageSize}`
        );
        const data = response.data
        return data;
        // console.error("Error fetching products:", error);
        // throw new Error("Products could not be loaded");
    },
  });

  const { products, currentPage, totalPages, totalProducts } = data || {};

  return { isLoading,error, products, currentPage, totalPages, totalProducts};
}