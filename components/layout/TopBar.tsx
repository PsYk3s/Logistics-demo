"use client";

import { useCurrentStaff } from "@/state/DashboardProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { WorldClocks } from "./WorldClocks";

export function TopBar() {
  const staff = useCurrentStaff();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-bg-border bg-bg-panel/40 px-4 py-2 lg:px-6">
      <span className="text-xs font-semibold uppercase tracking-widest text-fg-muted">
        Logistics Operations · Southern Africa Network
      </span>
      <WorldClocks />
      <div className="flex items-center gap-4 text-xs text-fg-muted">
        <span>System status: <span className="text-status-normal">Operational</span></span>
        <span>{staff.name} · {staff.role.replace("_", " ")}</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
