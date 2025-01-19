import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

export function useUpdateQuantity() {
  const dispatch = useDispatch()

    const {isLoading, mutate : updateQuantity } = useMutation({
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          const {data} = await axiosInstance.post('/cart/update', values)
          return data
      },
      onSuccess : (data)=> {
        if(data.success){
          // dispatch(login(data))
          toast.success(data.message || 'Updated Successfully')
        }else {
          toast.error(data.message)
        }
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, updateQuantity}
}