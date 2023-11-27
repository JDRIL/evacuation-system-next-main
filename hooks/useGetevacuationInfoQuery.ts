import { getEvacuationById } from "@/api/evacuations";
import { useQuery } from "@tanstack/react-query";
import { Collections } from "@/api/pocketbase";

const useGetEvacuationInfoQuery = (evacuationId: String) =>
  useQuery({
    queryKey: ["evacuation-people", evacuationId],
    queryFn: ({ queryKey }) => getEvacuationById(queryKey[1]),
    refetchInterval: 2000,
  });

export default useGetEvacuationInfoQuery;
