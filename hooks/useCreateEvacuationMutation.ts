import { createEvacuation } from "@/api/evacuations";
import { Collections } from "@/api/pocketbase";
import { useQueryClient, useMutation } from "@tanstack/react-query";


const useCreateEvacuationMutation = () => {
 
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvacuation,
    onSuccess: () =>     {
      queryClient.invalidateQueries([Collections.EVACUATIONS]);   
    } 
      
  });
};

export default useCreateEvacuationMutation;
