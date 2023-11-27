import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";


interface AlertsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  open: boolean;
}

const Alerts = ({ open
}: AlertsProps) => {
  const [close, setClose] = useState<boolean>(false)

  useEffect(() =>{
      setClose(open)
  },[open])


  return (
    <>
      {close &&
        (
          <div
            className="font-regular fixed right-5 left-5 top-2 block rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100 z-40"
            data-dismissible="alert"
          >
            <div className="mr-12">Success</div>
            <div
              className="absolute top-2.5 right-3 w-max rounded-lg transition-all hover:bg-white hover:bg-opacity-20"
              data-dismissible-target="alert"
            >
              <button
                role="button"
                className="w-max rounded-lg p-1"
                onClick={() => setClose(false)}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Alerts;
