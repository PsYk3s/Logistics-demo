"use client";

import { useState } from "react";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

interface DriverCardProps {
  driver: TruckDriver;
  truck?: Truck;
}

function getDriverStatusStyle(status: TruckDriver["status"]): "critical" | "warning" | "normal" | "resolved" | "info" | "neutral" {
  if (status === "EMERGENCY") return "critical";
  if (status === "DELAYED") return "warning";
  if (status === "ON_ROUTE") return "info";
  if (status === "OFF_DUTY") return "neutral";
  return "normal";
}

export function DriverCard({ driver, truck }: DriverCardProps) {
  const [open, setOpen] = useState(false);
  const initials = driver.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="rounded-lg border border-bg-border bg-bg-raised p-3">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center gap-3 text-left">
        <Avatar initials={initials} online={driver.status !== "OFF_DUTY"} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-fg">{driver.name}</p>
            <Badge tone={getDriverStatusStyle(driver.status)}>{driver.status.replace("_", " ")}</Badge>
          </div>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`h-3.5 w-3.5 shrink-0 text-fg-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <p className="mt-2 truncate border-t border-bg-border/60 pt-2 text-[11px] text-fg-muted">
          {truck ? `${truck.registration} · ${driver.currentLocation}` : driver.currentLocation}
        </p>
      )}
    </div>
  );
}

