import { createBeacon } from "@/api/beacons";
import { Collections } from "@/api/pocketbase";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const useCreateBeaconMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBeacon,
    onMutate: () => {
      // TODO: add optimistic update
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries([Collections.BEACONS]);
      queryClient.invalidateQueries([Collections.BEACONS_SUMMARY]);
    },
  });
};

export default useCreateBeaconMutation;
