import { updateBeacon } from "@/api/beacons";
import { Collections } from "@/api/pocketbase";
import Beacon, { BeaconSummary } from "@/types/Beacon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListResult } from "pocketbase";

const useUpdateBeaconMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBeacon,
    onMutate: async (updatedBeacon) => {
      await queryClient.cancelQueries({ queryKey: [Collections.BEACONS] });
      const previousBeacons = queryClient.getQueryData<ListResult<Beacon>>([
        Collections.BEACONS,
      ]);
      queryClient.setQueryData<
        | ListResult<Pick<BeaconSummary, "id"> & Partial<BeaconSummary>>
        | undefined
      >([Collections.BEACONS_SUMMARY], (old) => {
        if (!old) return undefined;
        return {
          ...old,
          items: old.items.map((item) =>
            item.id === updatedBeacon.id ? updatedBeacon : item
          ),
        };
      });
      return { previousBeacons };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([Collections.PEOPLE]);
      queryClient.invalidateQueries([Collections.BEACONS]);
      queryClient.invalidateQueries([Collections.BEACONS_SUMMARY]);
    },
  });
};

export default useUpdateBeaconMutation;
