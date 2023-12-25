import { useQuery } from "@tanstack/react-query"
import Author from "../../models/Author"
import apiClient from "../../services/api-client"






const useAuthor = (authorId: string) => useQuery<Author, Error>({
    queryKey: ["authors", authorId],
    queryFn: () => apiClient
        .get<Author>(`/authors/${authorId}`)
        .then(response => response.data),
})


export default useAuthor