import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import Member from "../models/Member";






const useMembers = () => useQuery<Member[], Error>({
    queryKey: ['members'],
    queryFn : () => apiClient
                        .get<Member[]>('/members')
                        .then((response) => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes

});


export default useMembers;

