import { Collections } from "../api/pocketbase";
import Beacon from "./Beacon";
import PersonType from "./PersonRole.enum";

type Person = {
  id: string;
  firstname: string;
  lastname: string;
  type: PersonType;
  company: string;
  team: string;
  is_brigade_member: boolean;
  expand: {
    "beacons(assigned_to)": [Beacon | undefined];
  };
};

export default Person;
