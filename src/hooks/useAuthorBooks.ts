

import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/api-client"
import Book from "../models/Book"






const useAuthor = (authorId: string) => useQuery<Book[], Error>({
    queryKey: ["authors", authorId, "books"],
    queryFn: () => apiClient
        .get<Book[]>(`/authors/${authorId}/books`)
        .then(response => response.data),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
})


export default useAuthor