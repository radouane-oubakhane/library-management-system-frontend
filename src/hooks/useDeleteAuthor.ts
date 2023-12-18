import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import Author from "../models/Author";

const useDeleteAuthor = (authorId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Author, Error, Author>({
    mutationFn: () =>
      apiClient
      .delete(`/authors/${authorId}`)
                .then((res) => {
                  return res.data;
                  
                }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authors"],
      });
    },
  });
};

export default useDeleteAuthor;


