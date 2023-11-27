import { getEvacuationInfo } from "@/api/evacuations";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetEvacuationById = (evacuationId: string) =>
  useQuery({
    queryKey: [Collections.PEOPLE_ON_EVACUATION, evacuationId],
    queryFn: ({ queryKey }) => getEvacuationInfo(queryKey[1]),
  });

export default useGetEvacuationById;
