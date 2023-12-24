import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Borrow from "../../models/Borrow";

interface DeleteBorrowContext {
  borrow: Borrow[];
}

const useDeleteBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Borrow, DeleteBorrowContext>({
    mutationFn: (borrow: Borrow) => apiClient
                                .delete(`/borrows/${borrow.id}`)
                                .then((res) => res.data),

    onMutate: (borrow: Borrow) => {
      const previousBorrows = queryClient.getQueryData<Borrow[]>(["borrows"]);

      queryClient.setQueryData<Borrow[]>(["borrows"], (old) => {
        return old?.filter((b) => b.id !== borrow.id) || [];
      });

      return { previousBorrows };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["borrows"]);
    },

    onError: (err, reservation, context) => {
      if (!context) return;
      queryClient.setQueryData<Borrow[]>(["borrows"], context.previousBorrows);
    },

  })
};

export default useDeleteBorrow;




