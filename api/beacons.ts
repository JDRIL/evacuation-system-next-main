import ScannedBeaconSummary from "@/types/ScannedBeaconSummary";
import Beacon, { BeaconSummary } from "../types/Beacon";
import pb, { Collections } from "./pocketbase";

export const getBeacons = async () => {
  return pb.collection(Collections.BEACONS).getList<Beacon>(1, 100, {
    expand: "assigned_to",
  });
};

export const getBeaconsSummary = async () => {
  return pb
    .collection(Collections.BEACONS_SUMMARY)
    .getList<BeaconSummary>(1, 100, {
      expand: "assigned_to,last_worksite",
    });
};

export const updateBeacon = (beacon: Pick<Beacon, "id"> & Partial<Beacon>) => {
  return pb.collection(Collections.BEACONS).update(beacon.id, beacon);
};

export const createBeacon = (beacon: Omit<Beacon, "id">) => {
  return pb.collection(Collections.BEACONS).create(beacon);
};

interface GetScannedBeaconsSummaryParams {
  worksite: string;
  from: Date;
}

export const getScannedBeaconsSummary = async ({
  worksite,
  from,
}: GetScannedBeaconsSummaryParams) => {
  const filter = `(worksite = "${worksite}" && last_seen_date >= "${from
    .toISOString()
    .replace(/T/, " ")
    .replace(/\.\d+Z$/, "Z")}")`;
  return pb
    .collection(Collections.SCANNED_BEACONS_SUMMARY)
    .getList<ScannedBeaconSummary>(1, 1000, {
      filter,
      sort: "-last_seen_date",
    });
};

interface ScannedBeacon {
  id: string;
  mac_address:string;
  latitude: number;
  longitude: number;
}

export const getScannedBeacons = () => {
  const oneMinuteAgo = new Date();
  oneMinuteAgo.setMinutes(oneMinuteAgo.getMinutes() - 30);
  return pb
    .collection("scanned_beacons_summary")
    .getList<ScannedBeacon>(1, 120, {
      sort: "-last_seen_date",
      filter: `(latitude!=0 && created > "${oneMinuteAgo
        .toISOString()
        .replace(/T/, " ")
        .replace(/\.\d+Z$/, "Z")}")`,
    });
};
