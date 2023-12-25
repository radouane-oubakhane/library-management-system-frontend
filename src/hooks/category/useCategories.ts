import { useQuery } from "@tanstack/react-query";
import Category from "../../models/Category";
import apiClient from "../../services/api-client";









const useCategories = () => useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: () => apiClient
        .get<Category[]>("/categories")
        .then(response => response.data),
});


export default useCategories;