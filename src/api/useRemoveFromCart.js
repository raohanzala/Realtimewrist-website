import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { isPending, mutate: removeFromCart } = useMutation({
    mutationFn: async (itemId) => {
      const { data } = await axiosInstance.post("/cart/remove", { itemId });
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Item removed successfully");
      } else {
        toast.error(data.message || "Failed to remove item");
      }

      queryClient.invalidateQueries({
        queryKey: ["userCart"],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to remove item from cart");
    },
  });

  return { isPending, removeFromCart };
}
