import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Category from "../../models/Category";

interface DeleteCategoryContext {
  book: Category[];
}

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Category, DeleteCategoryContext>({
    mutationFn: (category: Category) => apiClient
                                .delete(`/categories/${category.id}`)
                                .then((res) => res.data),

    onMutate: (category: Category) => {
      const previousCategories = queryClient.getQueryData<Category[]>(["categories"]) || [];

      queryClient.setQueryData<Category[]>(["categories"], (old) => {
        return old?.filter((c) => c.id !== category.id) || [];
      });

      return { previousCategories };
    },


    onError: (error, category, context) => {
      if (!context) return;
      queryClient.setQueryData<Category[]>(["categories"], context.previousCategories);
    },

  })
};

export default useDeleteCategory;




