import Badge from "@/components/Badge";
import { worksiteTypeLabel } from "@/const/worksiteType";
import useMapbox from "@/hooks/useMapbox";
import useTimeAgo from "@/hooks/useTimeAgo";
import { WorksiteSummary } from "@/types/Worksite";

interface WorkSiteListItemProps {
  worksite: WorksiteSummary;
}

const WorkSiteListItem = ({ worksite }: WorkSiteListItemProps) => {
  const { mapContainer } = useMapbox({
    defaultOptions: {
      center: [-74.18037, 4.789245],
      zoom: 15,
      dragPan: false,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
    },
  });

  const lastUpdateTimeAgo = useTimeAgo(worksite.last_scan_date);

  return (
    <li className="rounded-lg bg-white shadow-md overflow-hidden relative">
      <div className="flex justify-between ">
        <div className="p-6 py-4 flex-1">
          <div className="flex items-center space-x-4">
            <h2 className="font-semibold text-2xl">{worksite.name}</h2>
            <Badge size="small">{worksiteTypeLabel[worksite.type]}</Badge>
          </div>
          <div className="mt-2 space-y-1">
            <p className="text-gray-500">
              👨🏽 {worksite.scanned_beacons_count} people
            </p>
            <p className="text-gray-500">
              👩🏽‍🚒 {worksite.brigade_member_count} brigade members
            </p>
            <p className="text-gray-500">
              📍 {worksite.safepoints_count} safepoints
            </p>
          </div>
          <p className="text-gray-500 mt-2 italic text-xs text-end w-full">
            {lastUpdateTimeAgo
              ? `Occupation updated ${lastUpdateTimeAgo}`
              : "Occupation never update"}
          </p>
        </div>
       {/*<div className="w-1/3" ref={mapContainer} />*/} 
      </div>
    </li>
  );
};

export default WorkSiteListItem;
