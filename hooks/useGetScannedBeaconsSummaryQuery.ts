import { getScannedBeaconsSummary } from "@/api/beacons";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

interface UseGetScannedBeaconsSummaryParams {
  worksite: string;
  from: Date;
}

const useGetScannedBeaconsSummaryQuery = (
  filters: UseGetScannedBeaconsSummaryParams
) => {
  return useQuery({
    queryKey: [Collections.SCANNED_BEACONS_SUMMARY, filters],
    queryFn: ({ queryKey }) =>
      getScannedBeaconsSummary(
        queryKey[1] as UseGetScannedBeaconsSummaryParams
      ),
  });
};

export default useGetScannedBeaconsSummaryQuery;
