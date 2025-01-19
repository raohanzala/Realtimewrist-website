import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useUserOrders() {
  
  const { isPending, error, data } = useQuery({
    queryKey: ['userOrders'],
    queryFn: async () => {
      const {data} = await axiosInstance.get('/order/userorders')
      console.log(data, 'DATA ORDRS')
      return data
    },
});
const orders = data?.orders;

  return { isPending, error, orders };
}