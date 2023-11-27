import Company from "../types/Company";
import pb, { Collections } from "./pocketbase";

export const getCompanies = async () => {
  return pb.collection(Collections.COMPANIES).getList<Company>(1, 100);
};

export const createCompany = async (company: Omit<Company, "id">) => {
  return pb.collection(Collections.COMPANIES).create(company);
};
