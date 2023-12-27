import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import Member from "../../models/Member";

interface AddProfileContext {
  profile: Member[];
}

const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Member, Error, Member, AddProfileContext>({
    mutationFn: (profile: Member) =>
      apiClient.put(`/profile`, profile).then((res) => res.data),

    onMutate: (newProfile: Member) => {
      const previousProfiles =
        queryClient.getQueryData<Member>(["profile"]) || [];

      queryClient.setQueryData<Member[]>(["profile"], (old = []) => [
        ...old.map((profile) =>
          profile.id === newProfile.id ? { ...profile, ...newProfile } : profile
        ),
      ]);
      return { previousProfiles };
    },

    onSuccess: (savedProfile:any, newProfile:any) => {
      queryClient.invalidateQueries(["categories"]);
    },

    onError: (error:any, profile:any, context:any) => {
      if (!context) return;
      queryClient.setQueryData<Member[]>(
        ["profile"],
        context.previousProfiles
      );
    },
  });
};

export default useEditProfile;



