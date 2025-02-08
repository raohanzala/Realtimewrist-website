import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import toast from "react-hot-toast";

export function useOrders() {

  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["userOrders"],
    queryFn:async () =>   {
      const {data} = await axiosInstance.get('/order/userorders')
      return data
    },
    retry: false,
    onSuccess :()=> toast.success('USER ORdER')
  },
);

  return { isPending, error, data };
}