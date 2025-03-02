import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";

export function useSignUp() {
  const dispatch = useDispatch()

    const {isPending, mutate : signUp } = useMutation({
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          const {data} = await axiosInstance.post('/user/register', values)
          return data

      },
      
      onSuccess : (data)=> {
        if(data.success){
          dispatch(login(data))
          toast.success(data.message || 'Register Successfully')
        }else {
          toast.error(data.message)
        }
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, signUp}
}