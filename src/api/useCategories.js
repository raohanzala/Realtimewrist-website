import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/contants";

// export function useCategories(isAll = false) {
//   const { isPending, error, data } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/category");
//       return response.data;  
//     },
//   });

//  const categories = data?.categories
//  const totalCategories = data?.totalCategories
//   return { isPending, error, categories, totalCategories };
// }

export function useCategories(isAll = false) {
  const [searchParams] = useSearchParams();

  const page = isAll ? 1 :  (!searchParams.get("page") ? 1 : Number(searchParams.get("page")));
  const pageSize = isAll ? 20 : PAGE_SIZE; // Undefined is ignored in axios params
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const search = searchParams.get("search") || "";

  const { isPending, error, data } = useQuery({
    queryKey: ["categories", page, pageSize, sortBy, search], 
    queryFn: async () => {
      const { data } = await axiosInstance.get("/category", {
        params: { page, pageSize, sortBy, search },
      });
      return data;
    },
    keepPreviousData: true,
  });

  const { categories, currentPage, totalPages, totalCategories } = data || {};

  return { isPending, error, categories, currentPage, totalPages, totalCategories };
}