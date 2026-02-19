import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import TopHeader from "./TopHeader";
import StarField from "./StarField";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full relative">
      <StarField />
      <AppSidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <TopHeader title={title} subtitle={subtitle} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
