import Person from "../types/Person";
import pb, { Collections } from "./pocketbase";

export const getPeople = async () => {
  return pb
    .collection(Collections.PEOPLE)
    .getList<Person>(1, 100, { expand: `${Collections.BEACONS}(assigned_to)` });
};

export const createPerson = async (person: Omit<Person, "id">) => {
  return pb.collection(Collections.PEOPLE).create(person);
};

export const updatePerson = async (person: Person) => {
  return pb.collection(Collections.PEOPLE).update(person.id, person);
};
