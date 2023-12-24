import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Inscription from "../../models/Inscription";

interface DeleteInscriptionContext {
  inscription: Inscription[];
}

const useDeleteInscription = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Inscription, DeleteInscriptionContext>({
    mutationFn: (inscription: Inscription) => apiClient
                                .delete(`/inscriptions/${inscription.id}`)
                                .then((res) => res.data),

    onMutate: (inscription: Inscription) => {
      const previousInscriptions = queryClient.getQueryData<Inscription[]>(["inscriptions"]) || [];

      queryClient.setQueryData<Inscription[]>(["inscriptions"], (old) => {
        return old?.filter((i) => i.id !== inscription.id) || [];
      });

      return { previousInscriptions };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["inscriptions"]);
      queryClient.invalidateQueries(["profile"]);
    },

    onError: (error, book, context) => {
      if (!context) return;
      queryClient.setQueryData<Inscription[]>(["inscriptions"], context.previousInscriptions);
    },

  })
};

export default useDeleteInscription;




