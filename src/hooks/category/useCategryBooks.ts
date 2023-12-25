import { useQuery } from "@tanstack/react-query";
import Book from "../../models/Book";
import apiClient from "../../services/api-client";



const useCategoryBooks = (categoryId: string | undefined) => useQuery<Book[], Error>({
    queryKey: ["categories", categoryId, "books"],
    queryFn: () => apiClient
        .get<Book[]>("/categories/" + categoryId + "/books")
        .then(response => response.data),
});


export default useCategoryBooks;