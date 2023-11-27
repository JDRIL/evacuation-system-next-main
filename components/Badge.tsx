import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: "gray" | "red" | "green" | "blue";
  size?: "extra-small" | "small" | "normal" | "large";
}

const Badge = ({
  children,
  className,
  size = "normal",
  color = "gray",
}: BadgeProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center rounded-md font-medium",
          size === "extra-small" && "px-2 py-1 text-xs",
          size === "small" && "px-2 py-1 text-sm",
          size === "normal" && "px-3 py-1 text-base",
          size === "large" && "px-2 py-1 text-lg",
          color === "gray" && "bg-gray-100 text-gray-600",
          color === "red" && "bg-red-100 text-red-700",
          color === "green" && "bg-green-100 text-green-700",
          color === "blue" && "bg-blue-100 text-blue-700"
        ),
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
