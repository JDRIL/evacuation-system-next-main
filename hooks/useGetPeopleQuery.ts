import { getPeople } from "@/api/people";
import { Collections } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

const useGetPeopleQuery = () =>
  useQuery({
    queryKey: [Collections.PEOPLE],
    queryFn: getPeople,
  });

export default useGetPeopleQuery;
