import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Author from "../../models/Author";

interface DeleteAuthorContext {
  book: Author[];
}

const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Author, DeleteAuthorContext>({
    mutationFn: (author: Author) =>
      apiClient.delete(`/authors/${author.id}`).then((res) => res.data),

    onMutate: (author: Author) => {
      const previousAuthors = queryClient.getQueryData<Author[]>(["authors"]) || [];

      queryClient.setQueryData<Author[]>(["authors"], (old) => {
        return old?.filter((a) => a.id !== author.id) || [];
      });

      return { previousAuthors };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },


    onError: (error, author, context) => {
      if (!context) return;
      queryClient.setQueryData<Author[]>(["authors"], context.previousBooks);
    },
  });
};

export default useDeleteAuthor;
