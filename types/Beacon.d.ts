import Person from "./Person";
import Worksite from "./Worksite";

type BeaconExpand = {
  assigned_to?: Person;
  last_worksite?: Worksite;
};

type Beacon = {
  id: string;
  mac_address: string;
  assigned_to: string | null;
  expand?: BeaconExpand;
};

export default Beacon;

export type BeaconSummary = Beacon & {
  last_scanned_at: string;
  last_worksite: string;
  expand?: BeaconExpand;
};
