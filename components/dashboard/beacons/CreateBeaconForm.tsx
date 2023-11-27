import { Controller, useForm } from "react-hook-form";
import Beacon from "@/types/Beacon";
import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button/Button";
import Input from "@/components/Input";
import useGetPeopleQuery from "@/hooks/useGetPeopleQuery";

type CreateBeaconFormInput = Omit<Beacon, "id" | "expand">;

interface CreateBeaconFormProps {
  onSubmit: (beacon: CreateBeaconFormInput) => void;
  onCancel: () => void;
}

const CreateBeaconForm = ({ onSubmit, onCancel }: CreateBeaconFormProps) => {
  const { reset, handleSubmit, control } = useForm<CreateBeaconFormInput>({});

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const { data: peopleResponse } = useGetPeopleQuery();
  const people = peopleResponse?.items;

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 flex-1">
        <Controller
          name="mac_address"
          control={control}
          rules={{
            required: true,
            //maxLength: 17
          }}
          render={({ field: { value, onChange } }) => (
            <Input
              label="Mac address"
              value={value}
              onChange={(e) => {
                const formatted =
                  e.target.value
                    .toLowerCase()
                    .replace(/[^\d|A-Z]/g, "")
                    .match(/.{1,2}/g)
                    ?.join(":") ?? "";
                onChange(formatted);
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="assigned_to"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              label="Assigned to"
              {...{ value, onChange }}
              options={
                people?.map((person) => ({
                  value: person.id,
                  label: `${person.firstname} ${person.lastname}`,
                })) ?? []
              }
            />
          )}
        />
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

export default CreateBeaconForm;
