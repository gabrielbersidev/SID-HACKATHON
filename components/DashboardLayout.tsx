import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import type { Session } from "@supabase/supabase-js";

interface DashboardLayoutProps {
  children: React.ReactNode;
  session?: Session | null;
}

const DashboardLayout = ({ children, session }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex transition-colors duration-500">
      {/* Sidebar - Fixed width */}
      <Sidebar session={session} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:pl-64">
        <Header />
        
        <main className="flex-1 p-12">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
