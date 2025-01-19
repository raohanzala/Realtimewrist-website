import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useUserCart() {

  const {
    isLoading,
    data,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn:async () =>   {
      const data = await axiosInstance.get('/cart/get')
      return data
    },
    retry: false,
  });


  return { isLoading, error, data };
}