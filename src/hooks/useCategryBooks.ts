import { useQuery } from "@tanstack/react-query";
import Book from "../models/Book";
import apiClient from "../services/api-client";



const useCategoryBooks = (categoryId: string) => useQuery<Book[], Error>({
    queryKey: ["categories", categoryId, "books"],
    queryFn: () => apiClient
        .get<Book[]>("/categories/" + categoryId + "/books")
        .then(response => response.data),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
});


export default useCategoryBooks;