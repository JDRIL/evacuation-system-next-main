import WorksiteType from "./WorksiteType.enum";

type Worksite = {
  id: string;
  name: string;
  type: WorksiteType;
  external_id: string;
};

export default Worksite;

export type WorksiteSummary = Worksite & {
  scanned_beacons_count: number;
  brigade_member_count: number;
  last_evacuation_start_date: string;
  last_evacuation_end_date: string;
  last_scan_date: string;
  safepoints_count: number;
  lat?:number;
  lng?:number;
};
