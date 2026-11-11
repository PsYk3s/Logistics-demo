"use client";

import { useState } from "react";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { formatFuel, formatTemperature } from "@/lib/formatters";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface TruckCardProps {
  truck: Truck;
  driver?: TruckDriver;
}

const statusTone: Record<Truck["status"], "critical" | "warning" | "normal" | "resolved" | "info" | "neutral"> = {
  EMERGENCY: "critical",
  BREAKDOWN: "critical",
  DELAYED: "warning",
  MAINTENANCE: "warning",
  ON_ROUTE: "info",
  LOADING: "normal",
  UNLOADING: "normal",
  AVAILABLE: "neutral",
};

export function TruckCard({ truck, driver }: TruckCardProps) {
  const [open, setOpen] = useState(false);
  const fuelTone = truck.fuelLevel < 25 ? "warning" : "info";

  return (
    <div className="rounded-lg border border-bg-border bg-bg-raised p-3">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between text-left">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-fg">{truck.registration}</p>
          <p className="truncate text-[11px] text-fg-muted">{truck.fleetNumber} · {truck.model}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone={statusTone[truck.status]}>{truck.status.replace("_", " ")}</Badge>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className={`h-3.5 w-3.5 shrink-0 text-fg-muted transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="mt-3 border-t border-bg-border/60 pt-3">
          <p className="text-xs text-fg-muted">{truck.location}</p>
          {driver && <p className="text-xs text-fg">{driver.name}</p>}

          <div className="mt-3 grid grid-cols-2 gap-3 text-[11px] text-fg-muted">
            <div>
              <div className="mb-1 flex justify-between">
                <span>Fuel</span>
                <span>{formatFuel(truck.fuelLevel)}</span>
              </div>
              <ProgressBar value={truck.fuelLevel} tone={fuelTone} />
            </div>
            <div>
              <span className="block">Temp</span>
              <span className="text-fg">{formatTemperature(truck.temperature)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

