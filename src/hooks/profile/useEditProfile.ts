import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/api-client";
import ProfileRequest from "../../models/ProfileRequest";
import Profile from "../../models/profile";

interface EditProfileContext {
  previousProfile: Profile[];
}

const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<Profile, Error, ProfileRequest, EditProfileContext>({
    mutationFn: (profile: ProfileRequest) =>
      apiClient.put(`/profile`, profile).then((res) => res.data),

    onMutate: (newProfile: ProfileRequest) => {
      const previousProfile =
        queryClient.getQueryData<Profile[]>(["profile"]) ?? [];

      queryClient.setQueryData<Profile[]>(["profile"], [newProfile as Profile]);

      return { previousProfile };

    },

    onSuccess: (savedAuthor, newAuthor) => {
      queryClient.invalidateQueries(["profile"]);
    },

    onError: (error, author, context) => {
      if (!context) return;
      queryClient.setQueryData<Profile[]>(["profile"], context.previousProfile);
    },
  });
};

export default useEditProfile;
