import { ReactNode } from "react";

interface DashboardPageHeaderProps {
  title: string;
  actions?: ReactNode;
}

const DashboardPageHeader = ({ title, actions }: DashboardPageHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h1>
      </div>
      <div className="flex space-x-3">{actions}</div>
    </div>
  );
};

export default DashboardPageHeader;
