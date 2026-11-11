"use client";

import { useDashboard } from "@/state/DashboardProvider";
import { DashboardView } from "@/state/dashboardReducer";
import { ManagersOnDuty } from "./ManagersOnDuty";

const navItems: { label: string; view: DashboardView }[] = [
  { label: "Overview", view: "OVERVIEW" },
  { label: "Live Operations", view: "LIVE_OPERATIONS" },
  { label: "Fleet", view: "FLEET" },
  { label: "Drivers", view: "DRIVERS" },
  { label: "Tickets", view: "TICKETS" },
  { label: "Events", view: "EVENTS" },
  { label: "Reports", view: "REPORTS" },
];

export function Sidebar() {
  const { view, setView } = useDashboard();

  return (
    <aside className="hidden w-56 shrink-0 flex-col overflow-y-auto border-r border-bg-border bg-bg-panel/60 p-4 lg:flex">
      <div className="mb-6 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-blue shadow-glow" />
        <span className="text-sm font-bold tracking-wide text-fg">LCC</span>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <button
            key={item.view}
            type="button"
            onClick={() => setView(item.view)}
            className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              view === item.view
                ? "bg-accent-blue/15 font-medium text-accent-blue"
                : "text-fg-muted hover:bg-bg-raised hover:text-fg"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <ManagersOnDuty />
    </aside>
  );
}
