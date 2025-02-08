import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

export function useSocialLinks() {

  const { isLoading, error, data } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/customize/social-links`);
      return data
    },
  });

  console.log(data, 'SOCIALLINKS')
  const {facebook , instagram, linkedin, whatsapp, youtube} = data || {}
  return { isLoading, error, facebook , instagram, linkedin, whatsapp, youtube };
}