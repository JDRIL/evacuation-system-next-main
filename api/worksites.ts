import pb, { Collections } from "./pocketbase";
import Worksite, { WorksiteSummary } from "../types/Worksite";

export const getWorksites = async () => {
  return pb.collection(Collections.WORKSITES).getList<Worksite>(1, 100);
};

export const getWorksitesSummary = async () => {
  return await pb
    .collection("worksites_summary")
    .getList<WorksiteSummary>(1, 100);
};

export const createWorksite = async (worksite: Omit<Worksite, "id">) => {
  return pb.collection(Collections.WORKSITES).create(worksite);
};
