import { createPerson } from "@/api/people";
import { Collections } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPerson,
    onMutate: () => {
      // optimistic update
    },
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.PEOPLE]);
    },
  });
};

export default useCreatePersonMutation;
