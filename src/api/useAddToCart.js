import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export function useAddUserCart() {
  const dispatch = useDispatch()

    const {isLoading, mutate : userAddCart } = useMutation({
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          const {data} = await axiosInstance.post('/cart/add', values)
          return data
      },
      
      onSuccess : (data)=> {
        if(data.success){
          console.log(data, 'QUERY DATA RETURN')
          toast.success(data.message || 'User Cart Successfully')
        }else {
          toast.error(data.message)
        }
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, userAddCart}
}