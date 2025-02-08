import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export function useAddUserCart() {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  let product;

    const {isPending, mutate : userAddCart } = useMutation({
      
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          product = values;
          const {item} = values
          console.log(item, 'QUERY DATA ITEM')
          const {data} = await axiosInstance.post('/cart/add', values)
          return data
      },     
      onSuccess : (data)=> {
        if(data.success){
          console.log(data, product, 'QUERY DATA RETURN')
          dispatch(addToCart({ itemId: product.itemId, item: product.item, quantity: product.quantity }));
          toast.success(data.message || 'User Cart Successfully')
        }else {
          toast.error(data.message)
        }
        queryClient.invalidateQueries({
          queryKey: ["userCart"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, userAddCart}
}