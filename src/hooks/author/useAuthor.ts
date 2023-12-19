import { useQuery } from "@tanstack/react-query"
import Author from "../../models/Author"
import apiClient from "../../services/api-client"






const useAuthor = (authorId: string) => useQuery<Author, Error>({
    queryKey: ["authors", authorId],
    queryFn: () => apiClient
        .get<Author>(`/authors/${authorId}`)
        .then(response => response.data),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
})


export default useAuthor