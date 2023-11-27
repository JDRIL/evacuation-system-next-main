import pb, { Collections } from "./pocketbase";
import Evacuation from "../types/Evacuation";
import EvacuationPeople from "@/types/EvacuationPeople";

export const getEvacuations = async () => {
  return pb
    .collection(Collections.EVACUATIONS)
    .getList<Evacuation>(1, 100, { expand: `worksite`, sort: "-end_date" });
};

export const getEvacuationInfo = async (evacuationId: string) => {
  return pb
    .collection(Collections.EVACUATIONS)
    .getOne<Evacuation>(evacuationId, {
      expand: `worksite`,
    });
};

export const getSiteLastEvacuation = async (site: string) => {
  return pb
    .collection(Collections.EVACUATIONS)
    .getList<Evacuation>(1, 1, {
      sort: "-created,-end_date",
      filter: `worksite="${site}"`,
    })
    .then((res) => res.items[0]);
};

export const createEvacuation = async (
  evacuation: Pick<Evacuation, "worksite" | "is_simulation">
) => {
  return pb.collection(Collections.EVACUATIONS).create(evacuation);
};

export const getEvacuationById = async (evacuationId: String) => {
  return pb.send<EvacuationPeople[]>(
    `/api/people-on-evacuation/${evacuationId}`,
    {}
  );
};

export const updateEvacuation = async (
  evacuation: Pick<Evacuation, "id" | "end_date">
) => {
  return pb
    .collection(Collections.EVACUATIONS)
    .update(evacuation.id, evacuation);
};
