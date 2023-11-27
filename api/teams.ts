import Team from "../types/Team";
import pb, { Collections } from "./pocketbase";

export const getTeams = async () => {
  return pb.collection(Collections.TEAMS).getList<Team>(1, 100);
};

export const createTeam = async (team: Omit<Team, "id">) => {
  return pb.collection(Collections.TEAMS).create(team);
};
