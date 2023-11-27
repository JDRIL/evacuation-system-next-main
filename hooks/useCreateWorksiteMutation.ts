import { Collections } from "@/api/pocketbase";
import { createWorksite } from "@/api/worksites";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Worksite, { WorksiteSummary } from "@/types/Worksite";
import { ListResult } from "pocketbase";

const useCreateWorksiteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorksite,
    onMutate:  async (newWorksite) =>{
      await queryClient.cancelQueries({ queryKey: [Collections.WORKSITES] });
      const previousWorksites = queryClient.getQueryData([Collections.WORKSITES]);
      queryClient.setQueryData([Collections.WORKSITES, newWorksite], newWorksite);
      console.log("HEY");
      console.log(newWorksite);
      console.log(previousWorksites);      
      return { previousWorksites, newWorksite }
    },   
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [Collections.WORKSITES] })
    },
    onSuccess: () => queryClient.invalidateQueries([Collections.WORKSITES]),
  });
};

export default useCreateWorksiteMutation;
