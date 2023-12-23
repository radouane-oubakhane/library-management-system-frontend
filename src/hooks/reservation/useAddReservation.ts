import { useMutation, useQueryClient } from "@tanstack/react-query";
import Reservation from "../../models/Reservation";
import ReservationRequest from "../../models/ReservationRequest";
import apiClient from "../../services/api-client";








const useAddReservation = () => {
  const queryClient = useQueryClient();

    return useMutation<Reservation, Error, ReservationRequest>({
      mutationFn: (reservation: ReservationRequest) => apiClient
                            .post<Reservation>("/reservations", reservation)
                            .then((response) => response.data),
      onSuccess: (reservation) => {
        queryClient.invalidateQueries(["reservations"]);
      },
    });
  };
  
  export default useAddReservation;