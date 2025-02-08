import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/slices/cartSlice";
import { useState } from "react";

export function usePlaceOrder() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [orderSuccess, setOrderSuccess] = useState(false); 


    const {isPending, mutate : placeOrder } = useMutation({
      mutationFn : async (values)=> {
        console.log(values, 'QUERY DATA')
          const {data} = await axiosInstance.post('/order/place', values)
          return data
      },
      
      onSuccess : (data)=> {
        if(data.success){
          toast.success(data.message || 'Order has been placed')
          // navigate("/orders")
          dispatch(clearCart())
          setOrderSuccess(true); 
        }else {
          toast.error(data.message)
        }
      },
      onError: (err)=> toast.error(err.message) 
    })

    return {isPending, placeOrder, orderSuccess, setOrderSuccess}
}






