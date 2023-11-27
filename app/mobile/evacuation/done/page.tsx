"use client";
import useUpdateEvacuationMutation from "@/hooks/useUpdateEvacuationMutation";
import { useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const DonePage = () => {
  const router = useRouter();
    const evacuationId = typeof window !== 'undefined' ? localStorage.getItem('evacuationId')??"":"";
    const finishEvacuation = useUpdateEvacuationMutation();
    useEffect(() => {
        const timeout = setTimeout(() => {
            finishEvacuation.mutate({
                id:evacuationId,
                end_date: new Date().toISOString()})
        }, 2000);
      
        return () => clearTimeout(timeout);
      }, []);

    return (
      <div className="min-h-screen bg-[#5ACB65] flex flex-col justify-center items-center space-y-20">
        
         <Image
         src="/great.svg"
         alt="great"
         className="dark:invert"
         width={200}
         height={200}
         priority
       />
        
        <div className="bg-[#CAD1F4] w-full flex flex-col items-center py-8 space-y-5 px-6 text-center">
          <p className=" text-xl font-bold">Everyone made it to the desiganted assembly point</p>
          <Button
        variant="white"
        onClick={() => router.push("/mobile/evacuation/new")}
      >
          Home
      </Button>
          </div>
         
       
      </div>
    );
  };
  
  export default DonePage;
  