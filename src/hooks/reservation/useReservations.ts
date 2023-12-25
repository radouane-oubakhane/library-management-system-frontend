import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Reservation from "../../models/Reservation";






const useReservations = () => useQuery<Reservation[], Error>({
    queryKey: ['reservations'],
    queryFn : () => apiClient
                        .get<Reservation[]>('/reservations')
                        .then((response) => response.data),

});


export default useReservations;