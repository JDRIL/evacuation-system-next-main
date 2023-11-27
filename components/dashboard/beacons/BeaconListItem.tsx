import Autocomplete from "@/components/Autocomplete";
import Badge from "@/components/Badge";
import useGetPeopleQuery from "@/hooks/useGetPeopleQuery";
import useTimeAgo from "@/hooks/useTimeAgo";
import useUpdateBeaconMutation from "@/hooks/useUpdateBeaconMutation";
import { BeaconSummary } from "@/types/Beacon";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface BeaconListItemProps {
  beacon: BeaconSummary;
}

const BeaconListItem = ({ beacon }: BeaconListItemProps) => {
  const { data: peopleResponse } = useGetPeopleQuery();
  const people = peopleResponse?.items;
  const updateBeaconMutation = useUpdateBeaconMutation();

  const THIRTY_MINUTES = 30;
  const now = new Date();
  const minutseDiff = Math.round(
    (now.getTime() - new Date(beacon.last_scanned_at).getTime()) / (60 * 1000)
  );
  const isOnline = minutseDiff < THIRTY_MINUTES;

  const lastScannedTimeAgo = useTimeAgo(beacon.last_scanned_at);
  const seen = Boolean(beacon.last_scanned_at);

  return (
    <li className="rounded-lg bg-white shadow-md  ">
      <div className="flex items-center justify-between border-b p-4 pt-4">
        <p className="text-sm font-medium">{beacon.mac_address}</p>
        <Badge size="extra-small" color={!seen || !isOnline ? "gray" : "green"}>
          {seen
            ? `last seen ${lastScannedTimeAgo} in ${beacon.expand?.last_worksite?.name}`
            : "Never seen"}
        </Badge>
      </div>
      <div className="border-b p-4 pt-2 flex items-center space-x-2 text-indigo-600">
        <Autocomplete
          className="w-full"
          label="Assigned to"
          value={beacon.assigned_to}
          placeholder="Unassigned"
          options={
            people?.map((person) => ({
              value: person.id,
              label: `${person.firstname} ${person.lastname}`,
            })) ?? []
          }
          onChange={(value) =>
            updateBeaconMutation.mutate({
              ...beacon,
              assigned_to: String(value),
            })
          }
        />
        <button
          className="mt-8 text-gray-500 transition hover:text-red-500"
          onClick={() =>
            updateBeaconMutation.mutate({ ...beacon, assigned_to: "" })
          }
        >
          <MinusCircleIcon className="h-5 hover:text-indigo-500" />
        </button>
      </div>
      {/* <div className="flex items-center justify-between border-b p-4 pt-4 ">
          <label className="text-sm font-medium text-gray-900">Track ?</label>
          <Toggle
            enabled={beacon.is_tracked}
            onChange={(checked) => mutate({ ...beacon, is_tracked: checked })}
          />
        </div> */}
    </li>
  );
};

export default BeaconListItem;
