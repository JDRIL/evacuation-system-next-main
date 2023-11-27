import { twMerge } from "tailwind-merge";
import React, { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
}

// TODO: manage error state

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = "text",
      className: customClassName,
      startIcon: StartIcon,
      ...rest
    },
    ref
  ) => {
    const className = twMerge(
      "block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6",
      StartIcon && "pl-10",
      customClassName
    );
    return (
      <div>
        {label ? (
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
        ) : null}
        <div className={clsx("relative", label && "mt-2")}>
          {StartIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <StartIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <input {...{ ref, type, className, ...rest }} />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
