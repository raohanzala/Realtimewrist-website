import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";

export function useUpdateQuantity() {
  const queryClient = useQueryClient()

    const {isLoading, mutate : updateQuantity } = useMutation({
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          const {data} = await axiosInstance.post('/cart/update', values)
          return data
      },
      onSuccess : (data)=> {
        if(data.success){
          toast.success(data.message || 'Updated Successfully')
        }else {
          toast.error(data.message)
        }

        queryClient.invalidateQueries({
          queryKey: ["userCart"],
        });
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, updateQuantity}
}