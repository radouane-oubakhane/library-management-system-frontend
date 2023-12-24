import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Reservation from "../../models/Reservation";

interface BorrowReservationContext {
  member: Reservation[];
}

interface BorrowReservationRequest {
  return_date: string;
}


const useBorrowReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<BorrowReservationRequest, Error, Reservation, BorrowReservationContext>({
    mutationFn: (reservation: Reservation) => apiClient
                                .put<BorrowReservationRequest>(`reservations/${reservation.id}/borrow`, { return_date: reservation.return_date})
                                .then((res) => res.data),

    onMutate: (reservation: Reservation) => {
      const previousReservations = queryClient.getQueryData<Reservation[]>(["reservations"]);

      queryClient.setQueryData<Reservation[]>(["reservations"], (old) => {
        return old?.map((r) => r.id == reservation.id ? {...r, status: "borrowed"} : r) || [];
      });

      return { previousReservations };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
      queryClient.invalidateQueries(["borrows"]);
    },

    onError: (err, reservation, context) => {
      if (!context) return;
      queryClient.setQueryData<Reservation[]>(["reservations"], context.previousReservations);
    },

  })
};

export default useBorrowReservation;



