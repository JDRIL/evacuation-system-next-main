import { getEntitiesCount } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useNavigationStats = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: getEntitiesCount,
  });

export default useNavigationStats;
