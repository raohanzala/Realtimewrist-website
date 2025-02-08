import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { PAGE_SIZE } from "../utils/contants";

export function useProducts() {
  const [searchParams] = useSearchParams();
  const pageSize = PAGE_SIZE;

  const gender = searchParams.get("gender");
  const sortBy = searchParams.get("sort") || "";

  const fetchProducts = async ({ pageParam = 1 }) => {
    try {
      const response = await axiosInstance.get(`/product/products`, {
        params: {
          page: pageParam,
          pageSize,
          gender, 
          sortBy

        },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Error fetching products.");
    }
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products", gender, sortBy],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      const currentPage = lastPage?.currentPage || 1;
      const totalProducts = lastPage?.totalProducts || 0;
      return currentPage * pageSize < totalProducts ? currentPage + 1 : undefined;
    },
  });

  // Flatten the pages array to get all products
  const products = data?.pages.flatMap((page) => page.products) || [];

  return { products, error, fetchNextPage, hasNextPage, isFetchingNextPage, status };
}
