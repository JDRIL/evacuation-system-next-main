import { ReactNode } from "react";

interface DashboardPageContentProps {
  children?: ReactNode;
}

const DashboardPageContent = ({ children }: DashboardPageContentProps) => {
  return <div className="space-y-6">{children}</div>;
};

export default DashboardPageContent;
