import Profile from "../../models/profile";
import apiClient from "../../services/api-client";
import { useQuery } from "@tanstack/react-query";




const useMemberProfile = () => useQuery<Profile, Error>({
    queryKey: ["profile"],
    queryFn: () => apiClient
                        .get<Profile>('/profile')
                        .then((res) => res.data),
});


export default useMemberProfile;