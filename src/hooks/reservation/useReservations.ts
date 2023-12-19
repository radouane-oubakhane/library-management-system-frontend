import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Reservation from "../../models/Reservation";






const useReservations = () => useQuery<Reservation[], Error>({
    queryKey: ['reservations'],
    queryFn : () => apiClient
                        .get<Reservation[]>('/reservations')
                        .then((response) => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes

});


export default useReservations;