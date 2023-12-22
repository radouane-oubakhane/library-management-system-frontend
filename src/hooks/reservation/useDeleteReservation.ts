import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Reservation from "../../models/Reservation";

interface DeleteMemberContext {
  member: Reservation[];
}

const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Reservation, DeleteMemberContext>({
    mutationFn: (reservation: Reservation) => apiClient
                                .delete(`/reservations/${reservation.id}`)
                                .then((res) => res.data),

    onMutate: (reservation: Reservation) => {
      const previousReservations = queryClient.getQueryData<Reservation[]>(["reservations"]);

      queryClient.setQueryData<Reservation[]>(["reservations"], (old) => {
        return old?.filter((m) => m.id !== reservation.id) || [];
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

export default useDeleteReservation;




