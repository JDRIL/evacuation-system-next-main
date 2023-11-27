"use client";
import { useState } from "react";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { Controller, useForm } from "react-hook-form";
import PersonType from "@/types/PersonRole.enum";
import Input from "@/components/Input";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import Autocomplete from "@/components/Autocomplete";
import { roleLabel } from "@/const/role";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button/Button";
import SlideOver from "@/components/SlideOver/SlideOver";
import CreatePersonForm from "@/components/dashboard/people/CreatePersonForm";
import useGetPeopleQuery from "@/hooks/useGetPeopleQuery";
import useGetBeaconsQuery from "@/hooks/useGetBeaconsQuery";
import useGetCompaniesQuery from "@/hooks/useGetCompaniesQuery";
import useGetTeamsQuery from "@/hooks/useGetTeamsQuery";
import useCreatePersonMutation from "@/hooks/useCreatePersonMutation";
import useUpdatePersonMutation from "@/hooks/useUpdatePersonMutation";
import useUpdateBeaconMutation from "@/hooks/useUpdateBeaconMutation";
import Toggle from "@/components/Toggle/Toggle";

interface FilterPeopleInput {
  query: string;
  type: PersonType;
}

const PeoplePage = () => {
  const [showAddPersonSlideOver, setShowAddPersonSlideOver] = useState(false);

  const toggleShowAddPersonSlideOver = (show: boolean) => () =>
    setShowAddPersonSlideOver(show);

  const { data: peopleResponse } = useGetPeopleQuery();
  const people = peopleResponse?.items;
  console.log(people);

  const { data: beaconsResponse } = useGetBeaconsQuery();
  const beacons = beaconsResponse?.items;

  const { data: companiesResponse } = useGetCompaniesQuery();
  const companies = companiesResponse?.items;

  const { data: teamsResponse } = useGetTeamsQuery();
  const teams = teamsResponse?.items;

  const { register, watch, control, resetField } = useForm<FilterPeopleInput>({
    defaultValues: {
      query: "",
      type: undefined,
    },
  });

  const createPersonMutation = useCreatePersonMutation();
  const updatePersonMutation = useUpdatePersonMutation();
  const updateBeaconMutation = useUpdateBeaconMutation();

  const handleUpdatePersonBeacon = (
    id: string,
    assignedTo: string | null,
    oldBeaconId?: string | undefined
  ) => {
    if (oldBeaconId) {
      updateBeaconMutation.mutate({
        id: oldBeaconId,
        assigned_to: null,
      });
    }
    const beacon = beacons?.find((beacon) => beacon.id === id);
    if (!beacon) return;
    updateBeaconMutation.mutate({
      ...beacon,
      assigned_to: assignedTo,
    });
  };

  const filteredPeople = people?.filter((person) => {
    const nameMatch = `${person.firstname} ${person.lastname}`
      .toLocaleLowerCase()
      .includes(watch("query").toLocaleLowerCase());
    let roleMatch = true;
    if (watch("type")) {
      roleMatch = person.type === watch("type");
    }
    return nameMatch && roleMatch;
  });

  return (
    <>
      <DashboardPage>
        <DashboardPage.Header
          title="People"
          actions={
            <Button
              variant="secondary"
              leadingIcon={PlusIcon}
              onClick={toggleShowAddPersonSlideOver(true)}
            >
              Add a Person
            </Button>
          }
        />
        <DashboardPage.Content>
          <div className="flex space-x-6">
            <div className="flex space-x-2 items-center">
              <Input
                label="Search"
                {...register("query")}
                className="flex-1"
                startIcon={MagnifyingGlassIcon}
                placeholder="Search for a person"
              />
              <button
                className="mt-8 text-gray-500 transition hover:text-red-500"
                onClick={() => resetField("query")}
              >
                <TrashIcon className="h-4 hover:text-indigo-500" />
              </button>
            </div>
            <div className="flex space-x-2 items-center">
              <Controller
                control={control}
                name="type"
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    label="Type"
                    value={value}
                    onChange={(role) => onChange(role as PersonType)}
                    options={[
                      {
                        value: PersonType.EMPLOYEE,
                        label: roleLabel[PersonType.EMPLOYEE],
                      },
                      {
                        value: PersonType.VISITOR,
                        label: roleLabel[PersonType.VISITOR],
                      },
                      {
                        value: PersonType.PROVIDER,
                        label: roleLabel[PersonType.PROVIDER],
                      },
                    ]}
                    placeholder="Select a role"
                  />
                )}
              />
              <button
                className="mt-8 text-gray-500 transition hover:text-red-500"
                onClick={() => resetField("type")}
              >
                <TrashIcon className="h-4 hover:text-indigo-500" />
              </button>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-300 rounded-xl">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Beacon
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Is brigade member
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white rounded-xl">
                {filteredPeople?.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 rounded-xl">
                      {person.firstname} {person.lastname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Autocomplete
                        value={person.type}
                        onChange={(type) =>
                          updatePersonMutation.mutate({
                            ...person,
                            type: type as PersonType,
                          })
                        }
                        options={[
                          {
                            value: PersonType.EMPLOYEE,
                            label: roleLabel[PersonType.EMPLOYEE],
                          },
                          {
                            value: PersonType.VISITOR,
                            label: roleLabel[PersonType.VISITOR],
                          },
                          {
                            value: PersonType.PROVIDER,
                            label: roleLabel[PersonType.PROVIDER],
                          },
                        ]}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Autocomplete
                        value={person.company}
                        disabled={person.type === PersonType.EMPLOYEE}
                        onChange={(company) =>
                          updatePersonMutation.mutate({
                            ...person,
                            company,
                          })
                        }
                        options={companies?.map((company) => ({
                          value: company.id,
                          label: company.name,
                        }))}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <Autocomplete
                        value={person.team}
                        onChange={(team) =>
                          updatePersonMutation.mutate({
                            ...person,
                            team,
                          })
                        }
                        options={teams?.map((team) => ({
                          value: team.id,
                          label: team.name,
                        }))}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                      <div className="flex items-center space-x-2">
                        <Autocomplete
                          className="flex-1"
                          placeholder="No beacon assigned"
                          value={person.expand["beacons(assigned_to)"]?.[0]?.id}
                          onChange={(id) => {
                            handleUpdatePersonBeacon(
                              id,
                              person.id,
                              person.expand["beacons(assigned_to)"]?.[0]?.id
                            );
                          }}
                          options={
                            beacons?.map((beacon) => ({
                              value: beacon.id,
                              label: beacon.assigned_to
                                ? `${beacon.mac_address} ${
                                    beacon.assigned_to !== person.id
                                      ? `(⚠️ Assigned to ${beacon.expand?.assigned_to?.firstname} ${beacon.expand?.assigned_to?.lastname})`
                                      : ""
                                  }`
                                : `${beacon.mac_address} (available)`,
                            })) ?? []
                          }
                        />
                        <button
                          className=" text-gray-500 transition hover:text-red-500"
                          onClick={() => resetField("type")}
                        >
                          <TrashIcon className="h-4 hover:text-indigo-500" />
                        </button>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                      <Toggle
                        enabled={person.is_brigade_member}
                        onChange={(is_brigade_member) =>
                          updatePersonMutation.mutate({
                            ...person,
                            is_brigade_member,
                          })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardPage.Content>
      </DashboardPage>
      <SlideOver
        title="Add a Person"
        open={showAddPersonSlideOver}
        onClose={toggleShowAddPersonSlideOver(false)}
      >
        <CreatePersonForm
          onCancel={toggleShowAddPersonSlideOver(false)}
          onSubmit={createPersonMutation.mutate}
        />
      </SlideOver>
    </>
  );
};

export default PeoplePage;
