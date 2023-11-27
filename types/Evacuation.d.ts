import { Record } from "pocketbase";
import Worksite from "./Worksite";

type Evacuation = Record & {
  id: string;
  start_date: string;
  end_date?: string;
  worksite: string;
  is_simulation: boolean;
  scheduled_start_date?: string;
  expand?: {
    worksite?: Worksite;
  };
};

export default Evacuation;

type EvacuationSummary = Evacuation & {
  people_count: number;
};
