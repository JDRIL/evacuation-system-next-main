import { Collections } from "@/api/pocketbase";
import { getWorksitesSummary } from "@/api/worksites";
import { useQuery } from "@tanstack/react-query";

const useGetWorksitesSummaryQuery = () =>
  useQuery({
    queryKey: [Collections.WORKSITES_SUMMARY],
    queryFn: getWorksitesSummary,
  });

export default useGetWorksitesSummaryQuery;
