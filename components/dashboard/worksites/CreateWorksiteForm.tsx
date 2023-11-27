import { Controller, useForm } from "react-hook-form";
import Worksite from "@/types/Worksite";
import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import Input from "@/components/Input";
import WorksiteType from "@/types/WorksiteType.enum";

type CreateWorksiteFormInput = Omit<Worksite, "id">;

interface CreateWorksiteFormProps {
  onSubmit: (worksite: CreateWorksiteFormInput) => void;
  onCancel: () => void;
}

const CreateWorksiteForm = ({
  onSubmit,
  onCancel,
}: CreateWorksiteFormProps) => {
  const { register, control, reset, handleSubmit } =
    useForm<CreateWorksiteFormInput>({
      defaultValues: { type: WorksiteType.WAREHOUSE },
    });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 flex-1">
        <Input {...register("name")} label="Name" />
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              label="Type"
              options={[
                { value: "warehouse", label: "📦 Warehouse" },
                { value: "office", label: "🏢 Office" },
                { value: "store", label: "🏪 Store" },
                {value: "factory", label:"🏭 Factory"}
              ]}
              onChange={(type) => onChange(type as WorksiteType)}
              value={value}
            />
          )}
        />
        <Input {...register("external_id")} label="External ID" />
        {/* <Input {...register()} label="Minimal brigade members %" /> */}
      </div>
      <div className="space-x-3 flex items-center justify-end pb-6">
        <Button variant="secondary" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="flex-1" type="submit" onClick={onCancel}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CreateWorksiteForm;
