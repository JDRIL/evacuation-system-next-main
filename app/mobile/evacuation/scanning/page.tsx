"use client";
import useGetEvacuationInfoQuery from "@/hooks/useGetevacuationInfoQuery";
import { useState } from "react";
import Badge from "@/components/Badge";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import Timer from "@/components/Timer/Timer";
import Button from "@/components/Button/Button";
import useGetEvacuationById from "@/hooks/useGetEvacuationById";

const ScanningPage = () => {
  const evacuationId =
    typeof window !== "undefined"
      ? localStorage.getItem("evacuationId") ?? ""
      : "";
  const { data: evacuation } = useGetEvacuationById(evacuationId);
  
  
  const { data: people  } = useGetEvacuationInfoQuery(evacuationId);
  const [ShowConfirmationModal, setShowConfirmationModal] = useState(false);

  const safe = people?.filter((item) => item.arrival_time).length ?? 0;
  const unknow = people?.filter((item) => !item.arrival_time).length ?? 0;
  const total = safe + unknow;

  



  return (
    <div className="min-h-screen bg-[#E7505C] flex flex-col items-center space-y-16 pt-12">
      <Timer from={evacuation && new Date(evacuation.created)} />
      <div className="flex justify-center space-x-6 w-full">
        <StatCard label="Safe" value={safe} />
        <StatCard label="Worksite" value={unknow} />
        <StatCard label="Total" value={total} />
      </div>
      <Button variant="ordinary" onClick={() => setShowConfirmationModal(true)}>
        Finish evacuation
      </Button>

      <div className="bg-white rounded-t-3xl flex-1 w-full p-4">
        <table className="min-w-full">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 uppercase"
              >
                Last seen
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people?.map((person) => (
              <tr key={person.name}>
                <td className="whitespace-nowrap py-4 text-sm text-center font-medium text-gray-900 sm:pl-6 lg:pl-8">
                  {person.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  <Badge color= {person.arrival_time?  "green": "red" } size="small" className="w-full text-right">
                    {person.arrival_time?'SAFEPOINT':'WORKSITE'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        open={ShowConfirmationModal}
        mobile={true}
        title="Are you sure you want to finish the evacuation?"
        description={people && unknow>0? `${unknow} people are still missing`: "" }
        evacuationId={evacuationId}
        onClose={() => setShowConfirmationModal(false)}
      ></ConfirmationModal>
    </div>
  );
};

export default ScanningPage;

interface StatCardProps {
  label: string;
  value: number;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl min-w-[80px] px-4 h-20 flex flex-col justify-center items-center text-center">
      <p className=" uppercase font-bold text-sm">{label}</p>
      <p className=" text-2xl">{value}</p>
    </div>
  );
};
