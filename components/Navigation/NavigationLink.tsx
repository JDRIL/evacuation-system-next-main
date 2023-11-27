"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLink {
  href: string;
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref">
  >;
  count?: number;
}

interface NavigationLinkProps {
  link: NavigationLink;
}

const NavigationLink = ({ link }: NavigationLinkProps) => {
  const pathname = usePathname();

  return (
    <Link href={link.href} key={link.label}>
      <div
        className={clsx(
          pathname === link.href
            ? "bg-gray-50 text-indigo-600"
            : "text-gray-700 hover:text-indigo-900 hover:bg-indigo-50",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        )}
      >
        <link.icon
          className={clsx(
            pathname === link.href
              ? "text-indigo-600"
              : "text-gray-300 group-hover:text-indigo-900",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />
        {link.label}
        {link.count ? (
          <span
            className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
            aria-hidden="true"
          >
            {link.count}
          </span>
        ) : null}
      </div>
    </Link>
  );
};
export default NavigationLink;
