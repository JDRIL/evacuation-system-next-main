import Person from "./Person";

type PersonSummary = Person & {
  last_seen_date: string;
  worksite: string;
};
