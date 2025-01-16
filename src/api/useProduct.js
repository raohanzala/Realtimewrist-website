import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

export function useProduct() {
  const { productId } = useParams();

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => axiosInstance.get(`/product/single/${productId}`,),
    retry: false,
  });

  const { product } = data || {}

  return { isLoading, error, product };
}