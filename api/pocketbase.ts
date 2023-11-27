import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_URL);

export enum Collections {
  BEACONS = "beacons",
  BEACONS_SUMMARY = "beacons_summary",
  SCANNED_BEACONS_SUMMARY = "scanned_beacons_summary",
  WORKSITES_SUMMARY = "worksites_summary",
  PEOPLE = "people",
  WORKSITES = "worksites",
  EVACUATIONS = "evacuations",
  COMPANIES = "companies",
  TEAMS = "teams",
  PEOPLE_ON_EVACUATION = "people-on-evacuation",
}

export default pb;

export const getEntitiesCount = async () => {
  const { totalItems: peopleCount } = await pb
    .collection(Collections.PEOPLE)
    .getList(1, 1);
  const { totalItems: sitesCount } = await pb
    .collection(Collections.WORKSITES)
    .getList(1, 1);
  const { totalItems: beaconsCount } = await pb
    .collection(Collections.BEACONS)
    .getList(1, 1);
    const {totalItems: evacuationCount} = await pb
    .collection(Collections.EVACUATIONS)
    .getList(1,1)
  return { peopleCount, sitesCount, beaconsCount,evacuationCount };
};
