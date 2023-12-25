import { useQuery } from "@tanstack/react-query";
import Category from "../../models/Category";
import apiClient from "../../services/api-client";









const useCategory = (categoryId: string) => useQuery<Category, Error>({
    queryKey: ["categories", categoryId],
    queryFn: () => apiClient
        .get<Category>(`/categories/${categoryId}`)
        .then(response => response.data),
});


export default useCategory;