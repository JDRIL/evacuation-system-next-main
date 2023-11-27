import { getBeacons } from "@/api/beacons";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetBeaconsQuery = () =>
  useQuery({
    queryKey: [Collections.BEACONS],
    queryFn: getBeacons,
  });

export default useGetBeaconsQuery;
