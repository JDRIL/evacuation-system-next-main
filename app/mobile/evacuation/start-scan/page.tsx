"use client";
import Timer from "@/components/Timer/Timer";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import useGetEvacuationInfoQuery from "@/hooks/useGetevacuationInfoQuery";
import useGetEvacuationById from "@/hooks/useGetEvacuationById";

const StartScanPage = () => {
  const router = useRouter();
  const evacuationId =
    typeof window !== "undefined"
      ? localStorage.getItem("evacuationId") ?? ""
      : "";
  const { data: evacuation, isLoading:loadEvacuation } = useGetEvacuationById(evacuationId);
  const { data: people , isLoading } = useGetEvacuationInfoQuery(evacuationId);

  
  
const peopleCount = people?.length??0
  return (
    <div className="min-h-screen bg-[#5D6CC1] flex flex-col justify-center items-center space-y-20">
      {isLoading || loadEvacuation?"":<Timer from={evacuation && new Date(evacuation.created)}/>}
      <div className="bg-[#CAD1F4] w-full flex flex-col items-center py-8 space-y-5 px-6 text-center">
      <p className=" text-xl font-bold">{isLoading || loadEvacuation? "Loading...":`There are ${peopleCount} people on site`}</p>
        <p className="text-xl">Please scan to check the people nearby</p>
      </div>
      <Button
        variant="white"
        onClick={() => router.push("/mobile/evacuation/scanning")}
      >
        Scan Assembly point
      </Button>
    </div>
  );
};

export default StartScanPage;
