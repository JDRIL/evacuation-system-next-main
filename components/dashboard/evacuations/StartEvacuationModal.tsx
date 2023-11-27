import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button/Button";
import Autocomplete from "@/components/Autocomplete";
import useGetWorksitesQuery from "@/hooks/useGetWorksiteQuery";
import { worksiteTypeLabel } from "@/const/worksiteType";
import useCreateEvacuationMutation from "@/hooks/useCreateEvacuationMutation";
import Toggle from "@/components/Toggle/Toggle";
import { useRouter } from 'next/navigation';

interface StartEvacuationModalProps {
  open: boolean;
  mobile: boolean;
  onClose: (open: false) => void;
}

const StartEvacuationModal = ({
  open,
  mobile,
  onClose,
}: StartEvacuationModalProps) => {
  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const okButtoRef = useRef(null);
  const [is_drill, setDrill] = useState<boolean>(false);
  const { data: worksitesResponse } = useGetWorksitesQuery();
  const worksites = worksitesResponse?.items;

  const [selectedWorksite, setSelectedWorksite] = useState<string>();

  const createEvacuationMutation = useCreateEvacuationMutation();
  if(createEvacuationMutation.isSuccess && mobile){
    console.log(createEvacuationMutation.data)
    const evacuationId = createEvacuationMutation.data[0]?createEvacuationMutation.data[0].id:createEvacuationMutation.data.id ;
      localStorage.setItem('evacuationId',evacuationId);
      router.push('/mobile/evacuation/start-scan');     
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
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Start Evacuation
                    </Dialog.Title>
                    <div className="mt-2 text-left">
                      <Autocomplete
                        label="Worksite"
                        defaultValue={worksites?.[0]?.id}
                        value={selectedWorksite}
                        onChange={setSelectedWorksite}
                        options={worksites?.map((worksite) => ({
                          label: `${worksite.name} - ${
                            worksiteTypeLabel[worksite.type]
                          }`,
                          value: worksite.id,
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-start mt-4">
                      <Toggle
                        enabled={is_drill}
                        label="Is an evacuation drill?"
                        onChange={(e) => setDrill(e)}
                      ></Toggle>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <Button
                    variant="white"
                    onClick={() => onClose(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      createEvacuationMutation.mutate({
                        worksite: selectedWorksite!,
                        is_simulation: is_drill,
                      });
                      onClose(false);
                    }}
                    ref={okButtoRef}
                  >
                    Start evacuation
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

export default StartEvacuationModal;
