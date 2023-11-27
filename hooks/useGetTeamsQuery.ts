import { Collections } from "@/api/pocketbase";
import { getTeams } from "@/api/teams";
import { useQuery } from "@tanstack/react-query";

const useGetTeamsQuery = () =>
  useQuery({
    queryKey: [Collections.TEAMS],
    queryFn: getTeams,
  });

export default useGetTeamsQuery;
