import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useInView } from "framer-motion";

export function useInifniteScroll() {
  const [searchParams] = useSearchParams();
  const pageSize = 10; 

  const { isPending, error, data, hasNextPage, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey : ['products'],
    queryFn : async ()=> {

    },

    getNextPageParam : (lastPage, allPages) => {
      console.log('last pages', lastPage, allPages)
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    }
  });

  const {ref, inView} = useInView({
    threshold : 1
  })

  // const products = data?.pages?.flatMap((page) => page.products) || [];
  // const totalProducts = data?.pages?.[0]?.totalProducts || 0;
  // const currentPage = data?.pages?.[0]?.currentPage || 1;

  const {products, totalProducts, currentPage} = data

  return { isPending, error,ref, inView, products, totalProducts, currentPage, hasNextPage, fetchNextPage };
}






