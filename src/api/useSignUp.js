import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";

export function useSignUp() {
  // const dispatch = useDispatch()

    const {isLoading, mutate : signUp } = useMutation({
      mutationFn : (name, email, password)=> {
         axiosInstance.post('/user/register', { name, email, password })
      },
      
      onSuccess : ()=> {
        // dispatch(signUp())
        toast.success('SignUp successfully')
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, signUp}
}