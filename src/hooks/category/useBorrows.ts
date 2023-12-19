import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Borrow from "../../models/Borrow";






const useBorrows = () => useQuery<Borrow[], Error>({
    queryKey: ['borrows'],
    queryFn : () => apiClient
                        .get<Borrow[]>('/borrows')
                        .then((response) => response.data),
    staleTime: 1000 * 60 * 5, // 5 minutes

});


export default useBorrows;