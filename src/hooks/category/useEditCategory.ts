import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Category from "../../models/Category";

interface AddCategoryContext {
  category: Category[];
}

const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Category, AddCategoryContext>({
    mutationFn: (category: Category) =>
      apiClient.put(`/categories/${category.id}`, category,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      )
      .then((res) => res.data),

    onMutate: (newCategory: Category) => {
      const previousCategories =
        queryClient.getQueryData<Category[]>(["categories"]) || [];

      queryClient.setQueryData<Category[]>(["categories"], (old = []) => [
        ...old.map((category) =>
          category.id === newCategory.id ? { ...category, ...newCategory } : category
        ),
      ]);
      return { previousCategories };
    },

    onSuccess: (savedCategory, newCategory) => {
      queryClient.invalidateQueries(["categories"]);
    },

    onError: (error, category, context) => {
      if (!context) return;
      queryClient.setQueryData<Category[]>(
        ["categories"],
        context.previousCategories
      );
    },
  });
};

export default useEditCategory;



