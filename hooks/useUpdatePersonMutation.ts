import { updatePerson } from "@/api/people";
import { Collections } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdatePersonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePerson,
    onMutate: () => {
      // TODO: add optimistic update
    },
    onSuccess: () => queryClient.invalidateQueries([Collections.PEOPLE]),
  });
};

export default useUpdatePersonMutation;
