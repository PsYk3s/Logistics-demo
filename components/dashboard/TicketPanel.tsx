"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Ticket } from "@/domain/Ticket";
import { useDashboard } from "@/state/DashboardProvider";
import { TicketCard } from "./TicketCard";

const priorityOrder: Record<Ticket["priority"], number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

function sortTickets(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.updatedAt - a.updatedAt;
  });
}

export function TicketPanel() {
  const { simulation } = useDashboard();
  const openTickets = sortTickets(
    simulation.tickets.filter((ticket) => ticket.status !== "RESOLVED" && ticket.status !== "CLOSED")
  ).slice(0, 8);

  return (
    <section className="rounded-xl border border-bg-border bg-bg-panel p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Open Tickets</h2>
        <span className="text-xs text-fg-muted">{openTickets.length}</span>
      </div>
      <div className="card-stack relative mt-3 max-h-[65vh] space-y-2 overflow-y-auto pr-1">
        {openTickets.length === 0 && (
          <p className="py-6 text-center text-sm text-fg-muted">No open tickets.</p>
        )}
        <AnimatePresence initial={false} mode="popLayout">
          {openTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              layout="position"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <TicketCard ticket={ticket} assignee={simulation.staff.find((member) => member.id === ticket.assignedTo)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
