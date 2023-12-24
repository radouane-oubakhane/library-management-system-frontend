import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Inscription from "../../models/Inscription";

interface AcceptInscriptionContext {
  inscription: Inscription[];
}

const useAcceptInscription = () => {
  const queryClient = useQueryClient();

  return useMutation<Inscription, Error, Inscription, AcceptInscriptionContext>({
    mutationFn: (inscription: Inscription) => apiClient
                                .put(`/inscriptions/${inscription.id}/accept`)
                                .then((res) => res.data),

    onMutate: (inscription: Inscription) => {
      const previousInscriptions = queryClient.getQueryData<Inscription[]>(["inscriptions"]) || [];

      queryClient.setQueryData<Inscription[]>(["inscriptions"], (old) => {
        return old?.map((i) => {
            if (i.id === inscription.id) {
                return { ...i, status: "accepted" };
            }
            return i;
            }) || [];
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

export default useAcceptInscription;




