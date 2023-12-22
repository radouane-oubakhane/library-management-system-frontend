import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Author from "../../models/Author";

interface AddAuthorContext {
  book: Author[];
}

const useEditAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<Author, Error, Author, AddAuthorContext>({
    mutationFn: (author: Author) =>
      apiClient.put(`/authors/${author.id}`, author).then((res) => res.data),

    onMutate: (newAuthor: Author) => {
      const previousAuthors =
        queryClient.getQueryData<Author[]>(["authors"]) || [];

      queryClient.setQueryData<Author[]>(["authors"], (old = []) => [
        ...old.map((author) => {
          if (author.id === newAuthor.id) {
            return { ...author, ...newAuthor };
          }
          return author;

        }
        ),
      ]);

      return { previousAuthors };
    },

    onSuccess: (savedAuthor, newAuthor) => {
      queryClient.invalidateQueries(["authors"]);
    },

    onError: (error, author, context) => {
      if (!context) return;
      queryClient.setQueryData<Author[]>(["authors"], context.previousBooks);
    },
  });
};

export default useEditAuthor;
