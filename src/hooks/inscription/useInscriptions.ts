import { useQuery } from "@tanstack/react-query";
import Inscription from "../../models/Inscription";
import apiClient from "../../services/api-client";






const useInscriptions = () => useQuery<Inscription[], Error>({
    queryKey: ['inscriptions'],
    queryFn : () => apiClient
                        .get<Inscription[]>('/inscriptions')
                        .then((response) => response.data),

});


export default useInscriptions;

