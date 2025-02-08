import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export function useUserCart() {

  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["userCart"],
    queryFn:async () =>   {
      const {data} = await axiosInstance.get('/cart/get')
      return data

    },
    // retry: false,
    onSuccess :()=> toast.success('CART DATA')
  },
);
  

  return { isPending, error, data };
}