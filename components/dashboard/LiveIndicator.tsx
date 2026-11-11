"use client";

import { useDashboard } from "@/state/DashboardProvider";
import { formatRelativeTime } from "@/lib/dates";

export function LiveIndicator() {
  const { lastUpdated } = useDashboard();

  return (
    <div className="flex items-center gap-2 text-[11px] text-fg-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-live rounded-full bg-status-normal" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-status-normal" />
      </span>
      <span className="font-semibold uppercase tracking-wider text-status-normal">Live</span>
      <span>Last update {formatRelativeTime(lastUpdated)}</span>
    </div>
  );
}
