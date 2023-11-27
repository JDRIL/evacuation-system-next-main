import Beacon from "./Beacon";

type ScannedBeaconSummary = {
  id: string;
  mac_address: string;
  worksite: string;
  assigned_to: string;
  last_seen_date: string;
  assigned_to_firstname: string;
  assigned_to_lastname: string;
};

export default ScannedBeaconSummary;
