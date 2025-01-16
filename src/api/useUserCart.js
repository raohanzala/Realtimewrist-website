import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useUserCart() {

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>  axiosInstance.post('/cart/get'),
    retry: false,
  });

  const { userCart } = data || {}

  return { isLoading, error, userCart };
}