"use client";

import { useDashboard } from "@/state/DashboardProvider";
import { formatRelativeTime } from "@/lib/dates";

export function StatusBar() {
  const { simulation, lastUpdated } = useDashboard();
  const activeOperations = simulation.events.filter((event) => event.status !== "RESOLVED").length;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-bg-border bg-bg-panel/40 px-4 py-2 text-[11px] text-fg-muted lg:px-6">
      <span className="font-semibold text-status-normal">Simulation Active</span>
      <span>Last update {formatRelativeTime(lastUpdated)}</span>
      <span>{simulation.trucks.length} vehicles monitored</span>
      <span>{activeOperations} active operations</span>
    </div>
  );
}
