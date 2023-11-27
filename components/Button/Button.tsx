import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type Size = "extra-large" | "large" | "default" | "small" | "extra-small";
type Variant = "primary" | "secondary" | "danger" | "white"| "ordinary";

interface ButtonProps {
  children?: string | ReactNode;
  size?: Size;
  variant?: Variant;
  // for icon, use '@heroicons/react/20/solid'
  leadingIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  trailingIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  className?: string;
}

const Button = ({
  size = "default",
  variant = "primary",
  children,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className,
  ...rest
}: ButtonProps &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => {
  const defaultClassNames = twMerge(
    "inline-flex items-center justify-center rounded-md border border-transparent shadow-sm  font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
    variant == "primary" &&
      "bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 text-white",
    variant == "secondary" &&
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-400",
    variant == "danger" &&
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    variant == "white" &&
      "border-gray-300 bg-white text-indigo-900 shadow-sm hover:text-gray-500 focus:ring-red-400",
      variant == "ordinary" &&
      "bg-[#070C31] text-white shadow-sm hover:text-indigo-200 focus:text-gray-500 ",
    size == "extra-small" && "px-2.5 py-1.5 text-xs",
    size == "small" && "px-3 py-2 text-sm leading-4",
    size == "default" && "px-4 py-2 text-sm",
    size == "large" && "px-4 py-2 text-base",
    size == "extra-large" && "px-6 py-3 text-base",
    className
  );

  const iconClassNames = clsx(size == "extra-small" && "h-4 w-4", "h-5 w-5");

  return (
    <button type="button" className={defaultClassNames} {...rest}>
      {LeadingIcon && (
        <LeadingIcon
          className={clsx("-ml-1 mr-2", iconClassNames)}
          aria-hidden="true"
        />
      )}
      {children}
      {TrailingIcon && (
        <TrailingIcon
          className={clsx("ml-2 -mr-1", iconClassNames)}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default Button;
