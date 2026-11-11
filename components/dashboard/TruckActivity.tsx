"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Truck } from "@/domain/Truck";
import { useDashboard } from "@/state/DashboardProvider";
import { TruckCard } from "./TruckCard";

const priority: Record<Truck["status"], number> = {
  EMERGENCY: 0,
  BREAKDOWN: 1,
  DELAYED: 2,
  ON_ROUTE: 3,
  LOADING: 4,
  UNLOADING: 4,
  MAINTENANCE: 5,
  AVAILABLE: 6,
};

export function TruckActivity() {
  const { simulation } = useDashboard();
  const trucks = [...simulation.trucks]
    .sort((a, b) => priority[a.status] - priority[b.status] || b.lastUpdated - a.lastUpdated)
    .slice(0, 8);

  return (
    <section className="rounded-xl border border-bg-border bg-bg-panel p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Truck Activity</h2>
      <div className="card-stack relative mt-3 max-h-[65vh] space-y-2 overflow-y-auto pr-1">
        <AnimatePresence initial={false} mode="popLayout">
          {trucks.map((truck) => (
            <motion.div
              key={truck.id}
              layout="position"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <TruckCard truck={truck} driver={simulation.drivers.find((driver) => driver.id === truck.driverId)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
