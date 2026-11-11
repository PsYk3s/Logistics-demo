"use client";

import { AnimatePresence, motion } from "framer-motion";
import { formatTime } from "@/lib/dates";
import { useDashboard } from "@/state/DashboardProvider";
import { StatusDot } from "@/components/ui/StatusDot";

export function ActivityTimeline() {
  const { simulation } = useDashboard();
  const items = [...simulation.events].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  return (
    <section className="rounded-xl border border-bg-border bg-bg-panel p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Activity Timeline</h2>
      <ol className="card-stack relative mt-3 max-h-[65vh] space-y-3 overflow-y-auto pr-1">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((event) => (
            <motion.li
              key={event.id}
              layout="position"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="flex gap-3 text-xs"
            >
              <span className="mt-0.5 font-mono text-fg-muted">{formatTime(event.timestamp)}</span>
              <StatusDot
                severity={event.status === "RESOLVED" ? "RESOLVED" : event.severity}
                pulse={false}
                className="mt-1"
              />
              <span className="text-fg-muted">{event.title}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </section>
  );
}
