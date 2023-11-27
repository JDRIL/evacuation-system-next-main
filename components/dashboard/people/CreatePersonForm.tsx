import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import { Controller, useForm } from "react-hook-form";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { roleLabel } from "@/const/role";
import Person from "@/types/Person";
import PersonType from "@/types/PersonRole.enum";
import useGetBeaconsQuery from "@/hooks/useGetBeaconsQuery";
import useGetTeamsQuery from "@/hooks/useGetTeamsQuery";
import useGetCompaniesQuery from "@/hooks/useGetCompaniesQuery";

type CreatePersonFormInput = Omit<Person, "id"> & { beacon: string };

interface CreatePersonFormProps {
  onSubmit: (beacon: CreatePersonFormInput) => void;
  onCancel: () => void;
}

const CreatePersonForm = ({ onSubmit, onCancel }: CreatePersonFormProps) => {
  const { data: beaconsResponse } = useGetBeaconsQuery();
  const beacons = beaconsResponse?.items;

  const { data: companiesResponse } = useGetCompaniesQuery();
  const companies = companiesResponse?.items;

  const { data: teamsResponse } = useGetTeamsQuery();
  const teams = teamsResponse?.items;

  const {
    control,
    watch,
    register,
    resetField,
    handleSubmit,
    reset,
    setValue,
  } = useForm<CreatePersonFormInput>({
    defaultValues: { type: PersonType.EMPLOYEE, company: "parent_company1" },
  });

  const selectedBeacon = beacons?.find(
    (beacon) => beacon.id === watch("beacon")
  );

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 space-y-4">
        <Input label="Firstname" {...register("firstname")} />
        <Input label="Lastname" {...register("lastname")} />
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              label="Type"
              value={value}
              onChange={(type) => {
                if (type === PersonType.EMPLOYEE) {
                  setValue("company", "parent_company1");
                }
                onChange(type as PersonType);
              }}
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
          )}
        />
        <Controller
          control={control}
          name="company"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              disabled={watch("type") === PersonType.EMPLOYEE}
              label="Company"
              value={value}
              onChange={onChange}
              options={companies?.map((company) => ({
                label: company.name,
                value: company.id,
              }))}
            />
          )}
        />
        <Controller
          control={control}
          name="team"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              label="Team"
              value={value}
              onChange={onChange}
              options={teams?.map((team) => ({
                value: team.id,
                label: team.name,
              }))}
            />
          )}
        />
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="beacon"
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                className="w-full"
                label="Beacon"
                placeholder="Select a beacon"
                {...{ value, onChange }}
                options={
                  beacons?.map((beacon) => ({
                    value: beacon.id,
                    label: `${beacon.expand?.assigned_to ? "⚠️" : ""} ${
                      beacon.mac_address
                    }`,
                  })) ?? []
                }
              />
            )}
          />
          <button
            type="button"
            className="mt-8 text-gray-500 transition hover:text-red-500"
            onClick={() => resetField("beacon")}
          >
            <MinusCircleIcon className="h-5" />
          </button>
        </div>
        {selectedBeacon?.expand?.assigned_to ? (
          <div className="rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon
                  className="h-5 w-5 text-yellow-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Beacon already assigned
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    This beacon is already assigned to{" "}
                    <span className="font-medium">
                      {selectedBeacon?.expand?.assigned_to?.firstname}{" "}
                      {selectedBeacon?.expand?.assigned_to?.lastname}
                    </span>{" "}
                    and will be reassigned to this new person
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="space-x-3 flex items-center justify-end pb-6">
        <Button variant="secondary" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="flex-1" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreatePersonForm;
