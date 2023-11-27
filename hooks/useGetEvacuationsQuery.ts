import { getEvacuations } from "@/api/evacuations";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetEvacuationsQuery = () =>
  useQuery({
    queryKey: [Collections.EVACUATIONS],
    queryFn: getEvacuations,
  });

export default useGetEvacuationsQuery;
