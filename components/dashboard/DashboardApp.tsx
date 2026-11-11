"use client";

import { Dashboard } from "@/components/dashboard/Dashboard";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { StatusBar } from "@/components/layout/StatusBar";
import { DashboardProvider } from "@/state/DashboardProvider";

export function DashboardApp() {
  return (
    <DashboardProvider>
      <div className="flex h-screen flex-col">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto [scrollbar-gutter:stable]">
            <Dashboard />
          </main>
        </div>
        <StatusBar />
      </div>
    </DashboardProvider>
  );
}
