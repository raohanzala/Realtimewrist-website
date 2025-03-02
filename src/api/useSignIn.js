import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

export function useSignIn() {
  const dispatch = useDispatch()

    const {isPending, mutate : signIn } = useMutation({
      mutationFn : async (values)=> {
       const {data} = await axiosInstance.post('/user/login', values)
       return data
      },
      
      onSuccess : (data)=> {
        console.log(data, 'user login')
        if(data.success){
          dispatch(login(data))
          toast.success(data.message || 'Login Successfully')
        }else {
          toast.error(data.message)
        }
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, signIn}
}