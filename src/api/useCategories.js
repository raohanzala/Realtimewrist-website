import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useCategories() {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category");
      return response.data;  
    },
  });

 const categories = data?.categories
 const totalCategories = data?.totalCategories
  return { isPending, error, categories, totalCategories };
}