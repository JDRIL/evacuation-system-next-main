"use client";
import Button from "@/components/Button/Button";
import { useState } from "react";
import StartEvacuationModal from "@/components//dashboard/evacuations/StartEvacuationModal";
import Image from "next/image";


const NewEvacuationPage = () => {
  const [showStartEvacuationModal, setShowStartEvacuationModal] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-24">
      <div className="bg-[#070C31]  rounded-tl-[96px] rounded-br-[60px] p-12 ">
       {/*<h1 className=" text-7xl text-white font-body">safe&apos;em</h1>*/}
       <Image
              src="/appName.svg"
              alt="Safe'Em logo"
              className="dark:invert"
              width={100}
              height={30}
              priority
            />
      </div>
      <Button
          variant="danger"  
          onClick={() => setShowStartEvacuationModal(true)}
        >
          Start Evacuation
        </Button>
        <StartEvacuationModal mobile={true}
        open={showStartEvacuationModal}
        onClose={() => setShowStartEvacuationModal(false)}
      />
    
    </div>
  );
};

export default NewEvacuationPage;
