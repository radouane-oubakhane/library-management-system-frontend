



import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/api-client";





const useUpdatePicture = (path: string, id?: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData>({
    mutationFn: (formData: FormData) => {

        return apiClient
          .post<FormData>(`${path}${id ? `/${id}` : ""}/picture`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => res.data);
      },
    onSuccess: () => {
      queryClient.invalidateQueries([path]);
    },
  })
};

export default useUpdatePicture;



