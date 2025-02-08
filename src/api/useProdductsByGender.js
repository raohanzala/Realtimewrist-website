import { useInfiniteQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";
import { PAGE_SIZE } from "../utils/contants";
import { useSearchParams } from "react-router-dom";

export function useProductsByGender(gender) {
    const [searchParams] = useSearchParams();

  const pageSize = PAGE_SIZE; 
  const sortBy = searchParams.get("sort") || "";


  const fetchProducts = async ({ pageParam = 1 }) => {
    const { data } = await axiosInstance.get(`/product/gender/${gender}?page=${pageParam}&pageSize=${pageSize}&sortBy=${sortBy}`);
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["productsByGender", gender, sortBy],
    queryFn: fetchProducts,
    enabled: !!gender, 
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.currentPage || 1;
      const totalProducts = lastPage?.totalProducts || 0;
      return currentPage * pageSize < totalProducts ? currentPage + 1 : undefined;
    },
    retry: false,
    onSuccess: () => toast.success("Products fetched successfully!"),
  });

 
  const products = data?.pages.flatMap((page) =>{ 
    return page.products ? page.products : []

  }) || [];

  return { products, error, fetchNextPage, hasNextPage, isFetchingNextPage, status };
}
