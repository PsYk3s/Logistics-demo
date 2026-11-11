"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { useDashboard } from "@/state/DashboardProvider";
import { EventFilter } from "@/state/dashboardReducer";
import { EventCard } from "./EventCard";

function filterEvents(events: LogisticsEvent[], filter: EventFilter): LogisticsEvent[] {
  if (filter === "ALL") return events;
  // "WARNING" doubles as the "Delays" tab, but VEHICLE_ALERT/DRIVER_ALERT
  // events also use WARNING severity without affecting a truck's DELAYED
  // status — only match actual DELAY events here so this tab always agrees
  // with the "Potential Delays" summary tile.
  if (filter === "WARNING") return events.filter((event) => event.type === "DELAY");
  return events.filter((event) => event.severity === filter);
}

function sortEvents(events: LogisticsEvent[]): LogisticsEvent[] {
  const severityOrder: Record<LogisticsEvent["severity"], number> = { CRITICAL: 0, WARNING: 1, NORMAL: 2 };
  return [...events].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.lastUpdated - a.lastUpdated
  );
}

const tabs: { key: EventFilter; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "CRITICAL", label: "Emergencies" },
  { key: "WARNING", label: "Delays" },
  { key: "NORMAL", label: "Normal" },
];

export function EventFeed() {
  const { simulation, filter, setFilter } = useDashboard();
  const events = sortEvents(filterEvents(simulation.events, filter)).slice(0, 12);

  return (
    <section className="flex flex-col rounded-xl border border-bg-border bg-bg-panel p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Active Operations</h2>
      <div className="mt-2 flex flex-wrap gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
              filter === tab.key
                ? "bg-accent-blue/20 text-accent-blue"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="card-stack relative mt-3 max-h-[65vh] space-y-3 overflow-y-auto pr-1">
        {events.length === 0 && (
          <p className="py-8 text-center text-sm text-fg-muted">No events match this filter.</p>
        )}
        <AnimatePresence initial={false} mode="popLayout">
          {events.map((event) => {
            const truck = simulation.trucks.find((candidate) => candidate.id === event.truckId);
            const driver = simulation.drivers.find((candidate) => candidate.id === event.driverId);
            return (
              <motion.div
                key={event.id}
                layout="position"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              >
                <EventCard event={event} truckRegistration={truck?.registration} driverName={driver?.name} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

