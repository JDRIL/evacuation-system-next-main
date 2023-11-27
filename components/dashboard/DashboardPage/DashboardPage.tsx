import { ReactNode } from "react";
import DashboardPageHeader from "./DashboardPageHeader";
import DashboardPageContent from "./DashboardPageContent";

interface DashboardPageProps {
  children: ReactNode;
}

const DashboardPage = ({ children }: DashboardPageProps) => {
  return <div className="space-y-6">{children}</div>;
};

DashboardPage.Header = DashboardPageHeader;
DashboardPage.Content = DashboardPageContent;

export default DashboardPage;
