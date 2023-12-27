import { useMutation, useQueryClient } from "@tanstack/react-query";
import Book from "../../models/Book";
import apiClient from "../../services/api-client";

interface AddBookContext {
  book: Book[];
}

const useEditBook = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, Book, AddBookContext>({
    mutationFn: (book: Book) =>
      apiClient.put(`/books/${book.id}`, book).then((res) => res.data),

    onMutate: (newBook: Book) => {
      const previousBooks = queryClient.getQueryData<Book[]>(["books"]) || [];

      queryClient.setQueryData<Book[]>(["books"], (old = []) => [
        ...old.map((book) =>
          book.id === newBook.id ? { ...book, ...newBook } : book
        ),
      ]);

      return { previousBooks };
    },

    onSuccess: (savedBook, newBook) => {
      queryClient.invalidateQueries(["books"]);
      ["categories", "authors"].forEach((key) => {
        queryClient.invalidateQueries([key]);
      } 
      );
    },

    onError: (error, book, context) => {
      if (!context) return;
      queryClient.setQueryData<Book[]>(["books"], context.previousBooks);
    },
  });
};

export default useEditBook;


