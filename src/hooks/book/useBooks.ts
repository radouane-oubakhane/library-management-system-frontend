import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Book from "../../models/Book";




const useBooks = () => useQuery<Book[], Error>({
    queryKey: ["books"],
    queryFn: () => apiClient
                        .get<Book[]>("/books")
                        .then((res) => res.data),
});
    

export default useBooks;