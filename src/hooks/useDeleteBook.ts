import { useMutation, useQueryClient } from "@tanstack/react-query";
import Book from "../models/Book";
import apiClient from "../services/api-client";

const useDeleteBook = (bookId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Book, Error, Book>({
    mutationFn: () =>
      apiClient.delete(`/books/${bookId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });
};

export default useDeleteBook;


