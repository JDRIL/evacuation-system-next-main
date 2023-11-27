import { updateEvacuation } from "@/api/evacuations";
import { Collections } from "@/api/pocketbase";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const useUpdateEvacuationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateEvacuation,
      onMutate: () => {
        // TODO: add optimistic update
      },
      onSuccess: () => {        
        queryClient.invalidateQueries([Collections.EVACUATIONS]);
      },
      
    });
  }
  export default useUpdateEvacuationMutation;
