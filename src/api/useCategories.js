import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useCategories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("/category");
      return response.data;  
    },
  });

 const categories = data?.categories
  return { isLoading, error, categories };
}