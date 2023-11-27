import { getCompanies } from "@/api/companies";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetCompaniesQuery = () =>
  useQuery({
    queryKey: [Collections.COMPANIES],
    queryFn: getCompanies,
  });

export default useGetCompaniesQuery;
