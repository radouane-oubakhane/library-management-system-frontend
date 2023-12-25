import { useQuery } from "@tanstack/react-query"
import Author from "../../models/Author"
import apiClient from "../../services/api-client"






const useAuthors = () => useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: () => apiClient
        .get<Author[]>("/authors")
        .then(response => response.data),
})


export default useAuthors