import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import Button from "@/components/Button/Button";
import useUpdateEvacuationMutation from "@/hooks/useUpdateEvacuationMutation";

import { useRouter } from 'next/navigation'

 interface ConfirmationModalProps{
 open: boolean;
 title:string;
 description?:String;
 mobile:boolean;
 evacuationId?:string;
 onClose: (open: false) => void;
}
 
 const ConfirmationModal= ({ open,title,description, mobile,evacuationId="", onClose }: ConfirmationModalProps) => {
    const router = useRouter();
    const cancelButtonRef = useRef(null);
    const finishEvacuation = useUpdateEvacuationMutation();
     if(finishEvacuation.isSuccess){
      router.push('/mobile/evacuation/done'); 
     }
    return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>                  
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                     {title}
                     <div  className="text-base font-bold leading-6 text-red-500">
                     {description}
                     </div>
                    
                    </Dialog.Title>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Button
                    variant="white"
                    onClick={() => onClose(false)}
                    ref={cancelButtonRef}
                  >
                    NO
                  </Button>
                  <Button                    
                    variant="white"
                    onClick={() => {
                        finishEvacuation.mutate({
                            id:evacuationId,
                            end_date: new Date().toISOString()})
                    onClose(false);
                }}                   
                     >
                   YES
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};


export default ConfirmationModal;