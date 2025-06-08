
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole: 'Admin' | 'Technician' | 'Dashboard' | 'Read-Only' | 'Helpdesk';
}

const MainLayout = ({ children, userRole }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar userRole={userRole} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6" role="main">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
