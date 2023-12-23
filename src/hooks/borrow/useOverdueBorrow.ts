import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Borrow from "../../models/Borrow";



interface OverdueBorrowContext {
  borrow: Borrow[];
}




const useOverdueBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Borrow, OverdueBorrowContext>({
    mutationFn: (borrow: Borrow) => apiClient
                                .put(`borrows/${borrow.id}/overdue`)
                                .then((res) => res.data),

    onMutate: (borrow: Borrow) => {
      const previousBorrows = queryClient.getQueryData<Borrow[]>(["borrows"]);

      queryClient.setQueryData<Borrow[]>(["borrows"], (old) => {
        return old?.map((b) => b.id == borrow.id ? {...b, status: "overdue"} : b) || [];
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

export default useOverdueBorrow;



