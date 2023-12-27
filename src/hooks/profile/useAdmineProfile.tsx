import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";





const useAdmineProfile = () => useQuery<any, Error>({
    queryKey: ["AdmineProfile"],
    queryFn: () => apiClient
                        .get<any>("/profile")
                        .then((res) => res.data),
    staleTime: 1000 * 60 * 60 , // 1 hour
});
    

export default useAdmineProfile;