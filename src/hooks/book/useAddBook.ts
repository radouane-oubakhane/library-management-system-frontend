import { useMutation, useQueryClient } from "@tanstack/react-query";
import Book from "../../models/Book";
import apiClient from "../../services/api-client";

interface AddBookContext {
  book: Book[];
}

const useAddBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, Book, AddBookContext>({
    mutationFn: (book: Book) =>
      apiClient.post(`/books`, book).then((res) => res.data),

    onMutate: (newBook: Book) => {
      const previousBooks = queryClient.getQueryData<Book[]>(["books"]) || [];

      queryClient.setQueryData<Book[]>(["books"], (old = []) => [
        newBook,
        ...old,
      ]);

      return { previousBooks };
    },

    onSuccess: (savedBook, newBook) => {
      queryClient.invalidateQueries(["reservations"]);
    },

    onError: (error, book, context) => {
      if (!context) return;
      queryClient.setQueryData<Book[]>(["books"], context.previousBooks);
    },
  });
};

export default useAddBook;
