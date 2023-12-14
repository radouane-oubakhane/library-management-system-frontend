import { useQuery } from "@tanstack/react-query"
import { Author } from "../models/Author"
import apiClient from "../services/api-client"






const useAuthors = () => useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: () => apiClient
        .get<Author[]>("/authors")
        .then(response => response.data),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
})


export default useAuthors