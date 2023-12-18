import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import Category from "../models/Category";

const useDeleteCategory = (categoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category>({
    mutationFn: () =>
      apiClient.delete(`/categories/${categoryId}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export default useDeleteCategory;


