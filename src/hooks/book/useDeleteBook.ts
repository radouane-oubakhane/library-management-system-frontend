import { useMutation, useQueryClient } from "@tanstack/react-query";
import Book from "../../models/Book";
import apiClient from "../../services/api-client";

interface DeleteBookContext {
  book: Book[];
}

const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Book, DeleteBookContext>({
    mutationFn: (book: Book) => apiClient
                                .delete(`/books/${book.id}`)
                                .then((res) => res.data),

    onMutate: (book: Book) => {
      const previousBooks = queryClient.getQueryData<Book[]>(["books"]) || [];

      queryClient.setQueryData<Book[]>(["books"], (old) => {
        return old?.filter((b) => b.id !== book.id) || [];
      });

      return { previousBooks };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
      ["categories", "authors"].forEach((key) => {
        queryClient.invalidateQueries([key]);
      } 
      );
    },

   

    onError: (error, book, context) => {
      if (!context) return;
      queryClient.setQueryData<Book[]>(["books"], context.previousBooks);
    },

  })
};

export default useDeleteBook;


