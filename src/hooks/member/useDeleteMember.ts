import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Member from "../../models/Member";

interface DeleteMemberContext {
  member: Member[];
}

const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, Member, DeleteMemberContext>({
    mutationFn: (member: Member) => apiClient
                                .delete(`/members/${member.id}`)
                                .then((res) => res.data),

    onMutate: (member: Member) => {
      const previousMembers = queryClient.getQueryData<Member[]>(["members"]) || [];

      queryClient.setQueryData<Member[]>(["members"], (old) => {
        return old?.filter((m) => m.id !== member.id) || [];
      });

      return { previousMembers };
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["reservations"]);
    },

    onError: (error, member, context) => {
      if (!context) return;
      queryClient.setQueryData<Member[]>(["members"], context.previousMembers);
    },

  })
};

export default useDeleteMember;




