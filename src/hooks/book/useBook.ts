import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Book from "../../models/Book";




const useBook = (bookId: string) => useQuery<Book, Error>({
    queryKey: ["books", bookId],
    queryFn: () => apiClient
                        .get<Book>(`/books/${bookId}`)
                        .then((res) => res.data),
    staleTime: 1000 * 60 * 60 , // 1 hour
});
    

export default useBook;