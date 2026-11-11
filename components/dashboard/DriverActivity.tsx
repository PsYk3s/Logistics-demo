"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TruckDriver } from "@/domain/TruckDriver";
import { useDashboard } from "@/state/DashboardProvider";
import { DriverCard } from "./DriverCard";

const priority: Record<TruckDriver["status"], number> = {
  EMERGENCY: 0,
  DELAYED: 1,
  ON_ROUTE: 2,
  LOADING: 3,
  UNLOADING: 3,
  RESTING: 4,
  OFF_DUTY: 5,
};

export function DriverActivity() {
  const { simulation } = useDashboard();
  const drivers = [...simulation.drivers]
    .sort((a, b) => priority[a.status] - priority[b.status] || b.lastUpdated - a.lastUpdated)
    .slice(0, 8);

  return (
    <section className="rounded-xl border border-bg-border bg-bg-panel p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Driver Activity</h2>
      <div className="card-stack relative mt-3 max-h-[65vh] space-y-2 overflow-y-auto pr-1">
        <AnimatePresence initial={false} mode="popLayout">
          {drivers.map((driver) => (
            <motion.div
              key={driver.id}
              layout="position"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <DriverCard driver={driver} truck={simulation.trucks.find((truck) => truck.id === driver.truckId)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

