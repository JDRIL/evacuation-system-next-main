import { getBeaconsSummary } from "@/api/beacons";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetBeaconsSummaryQuery = () =>
  useQuery({
    queryKey: [Collections.BEACONS_SUMMARY],
    queryFn: getBeaconsSummary,
  });

export default useGetBeaconsSummaryQuery;
