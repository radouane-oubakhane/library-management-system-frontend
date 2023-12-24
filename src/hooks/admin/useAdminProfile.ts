import AdminProfile from "../../models/admin/AdminProfile";
import apiClient from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";




const useAdminProfile = () => useQuery<AdminProfile, Error>({
    queryKey: ["profile"],
    queryFn: () => apiClient
                        .get<AdminProfile>('/profile')
                        .then((res) => res.data),
    staleTime: 1000 * 60 * 60 , // 1 hour
});


export default useAdminProfile;