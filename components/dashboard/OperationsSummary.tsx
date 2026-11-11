"use client";

import { getDashboardSummary } from "@/state/selectors";
import { useDashboard } from "@/state/DashboardProvider";

export function OperationsSummary() {
  const { simulation } = useDashboard();
  const summary = getDashboardSummary(simulation);

  const cards = [
    { label: "Active Operations", value: summary.activeOperations, tone: "text-accent-cyan" },
    { label: "Potential Delays", value: summary.potentialDelays, tone: "text-status-warning" },
    { label: "Emergencies", value: summary.emergencies, tone: "text-status-critical" },
    { label: "Trucks On Route", value: summary.trucksOnRoute, tone: "text-accent-blue" },
    { label: "Open Tickets", value: summary.openTickets, tone: "text-accent-purple" },
    { label: "Completed Deliveries", value: summary.completedDeliveries, tone: "text-status-normal" },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border border-bg-border bg-bg-panel p-4">
          <p className={`text-2xl font-bold ${card.tone}`}>{card.value}</p>
          <p className="mt-1 text-[11px] uppercase tracking-wide text-fg-muted">{card.label}</p>
        </div>
      ))}
    </section>
  );
}
