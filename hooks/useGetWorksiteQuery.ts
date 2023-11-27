import { Collections } from "@/api/pocketbase";
import { getWorksites } from "@/api/worksites";
import { useQuery } from "@tanstack/react-query";

const useGetWorksitesQuery = () =>
  useQuery({
    queryKey: [Collections.WORKSITES],
    queryFn: getWorksites,
  });

export default useGetWorksitesQuery;
