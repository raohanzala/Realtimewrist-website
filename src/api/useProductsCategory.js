import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export function useProductsByCategory(categoryId) {
    const [searchParams] = useSearchParams();

  const pageSize = 10;
  const gender = searchParams.get("gender") || "";
  const sortBy = searchParams.get("sort") || "";


  const fetchProducts = async ({ pageParam = 1 }) => {
    try {
      const response = await axiosInstance.get(`/product/products/${categoryId}?page=${pageParam}&pageSize=${pageSize}&gender=${gender}&sortBy=${sortBy}`);
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
    queryKey: ["products", categoryId, gender, sortBy],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      const currentPage = lastPage?.currentPage || 1;
      const totalProducts = lastPage?.totalProducts || 0;
      return currentPage * pageSize < totalProducts ? currentPage + 1 : undefined;
    },
    enabled: !!categoryId,
  });

  console.log(data, 'PAGES DATA')
  const products = data?.pages?.flatMap((page) => page.products ? page.products : []) || [];

  return { products, error, fetchNextPage, hasNextPage, isFetchingNextPage, status };
}
