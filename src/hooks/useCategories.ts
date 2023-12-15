import { useQuery } from "@tanstack/react-query";
import Category from "../models/Category";
import apiClient from "../services/api-client";









const useCategories = () => useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => apiClient
        .get<Category[]>("/categories")
        .then(response => response.data),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
});


export default useCategories;