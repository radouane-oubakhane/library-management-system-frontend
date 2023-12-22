import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Reservation from "../../models/Reservation";

interface DeleteMemberContext {
  member: Reservation[];
}

const useBorrowReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Reservation, DeleteMemberContext>({
    mutationFn: (reservation: Reservation) => apiClient
                                .put(`reservations/${reservation.id}/borrow`)
                                .then((res) => res.data),

    onMutate: (reservation: Reservation) => {
      const previousReservations = queryClient.getQueryData<Reservation[]>(["reservations"]);

      queryClient.setQueryData<Reservation[]>(["reservations"], (old) => {
        return old?.map((m) => m.id == reservation.id ? {...m, status: "borrowed"} : m) || [];
      });

      return { previousReservations };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },

    onError: (err, reservation, context) => {
      if (!context) return;
      queryClient.setQueryData<Reservation[]>(["reservations"], context.previousReservations);
    },

  })
};

export default useBorrowReservation;



