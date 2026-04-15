import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar - Fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:pl-64">
        <Header />
        
        <main className="flex-1 p-8">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
