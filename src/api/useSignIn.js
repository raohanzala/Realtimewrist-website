import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export function useSignIn() {
  // const dispatch = useDispatch()

    const {isLoading, mutate : signIn } = useMutation({
      mutationFn : (name, email, password)=> {
         axiosInstance.post('/user/register', { name, email, password })
      },
      
      onSuccess : (data)=> {
        // dispatch(login(data))
        toast.success('Login successfully')
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isLoading, signIn}
}