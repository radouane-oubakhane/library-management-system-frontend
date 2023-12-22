import { useMutation } from "@tanstack/react-query";
import Reservation from "../../models/Reservation";
import ReservationRequest from "../../models/ReservationRequest";
import apiClient from "../../services/api-client";








const useAddReservation = () => {

    return useMutation<Reservation, Error, ReservationRequest>({
      mutationFn: (reservation: ReservationRequest) => apiClient
                            .post<Reservation>("/reservations", reservation)
                            .then((response) => response.data),
      onSuccess: (reservation) => {
        console.log(reservation);
      },
    });
  };
  
  export default useAddReservation;