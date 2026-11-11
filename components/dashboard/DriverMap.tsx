"use client";

import { useMemo, useState } from "react";
import { TruckDriver } from "@/domain/TruckDriver";
import { LocationType } from "@/types/logistics";
import { getLocations } from "@/data/locations";
import { useDashboard } from "@/state/DashboardProvider";
import { Badge } from "@/components/ui/Badge";

type RouteTone = "critical" | "warning" | "info" | "muted";

function getRouteTone(status: TruckDriver["status"]): RouteTone {
  if (status === "EMERGENCY") return "critical";
  if (status === "DELAYED") return "warning";
  if (status === "ON_ROUTE" || status === "LOADING" || status === "UNLOADING") return "info";
  return "muted";
}

function getBadgeTone(status: TruckDriver["status"]): "critical" | "warning" | "normal" | "resolved" | "info" | "neutral" {
  if (status === "EMERGENCY") return "critical";
  if (status === "DELAYED") return "warning";
  if (status === "ON_ROUTE") return "info";
  if (status === "OFF_DUTY") return "neutral";
  return "normal";
}

const toneDot: Record<RouteTone, string> = {
  critical: "bg-status-critical",
  warning: "bg-status-warning",
  info: "bg-accent-blue",
  muted: "bg-fg-dim",
};

const toneLine: Record<RouteTone, string> = {
  critical: "bg-status-critical/70",
  warning: "bg-status-warning/70",
  info: "bg-accent-blue/60",
  muted: "bg-fg-dim/40",
};

const typeLabels: Record<LocationType, string> = {
  DEPOT: "Depot",
  DISTRIBUTION_CENTRE: "Distribution Centre",
  CUSTOMER: "Customer Site",
  FUEL_STATION: "Fuel Station",
  SERVICE_CENTRE: "Service Centre",
  INTERCHANGE: "Interchange",
  HIGHWAY: "Highway Segment",
};

const toneOrder: Record<RouteTone, number> = { muted: 0, info: 1, warning: 2, critical: 3 };

export function DriverMap() {
  const { simulation } = useDashboard();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const locationTypes = useMemo(() => {
    const map = new Map<string, LocationType>();
    getLocations().forEach((location) => map.set(location.name, location.type));
    return map;
  }, []);

  const drivers = simulation.drivers.filter((driver) => driver.truckId);
  const delayedCount = drivers.filter((driver) => driver.status === "DELAYED").length;
  const emergencyCount = drivers.filter((driver) => driver.status === "EMERGENCY").length;
  const sortedDrivers = [...drivers].sort(
    (a, b) =>
      toneOrder[getRouteTone(b.status)] - toneOrder[getRouteTone(a.status)] ||
      a.name.localeCompare(b.name)
  );

  const selectedDriver = sortedDrivers.find((driver) => driver.id === selectedId) ?? sortedDrivers[0];
  const selectedTruck = selectedDriver
    ? simulation.trucks.find((truck) => truck.id === selectedDriver.truckId)
    : undefined;
  const selectedTone = selectedDriver ? getRouteTone(selectedDriver.status) : "muted";

  return (
    <section className="rounded-xl border border-bg-border bg-bg-panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-fg-muted">Driver Routes</h2>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-fg-muted">
          <LegendDot tone="info" label="On route" />
          <LegendDot tone="warning" label={`Delayed (${delayedCount})`} />
          <LegendDot tone="critical" label={`Emergency (${emergencyCount})`} />
          <LegendDot tone="muted" label="Idle" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,220px)_1fr]">
        <ul className="card-stack relative max-h-[360px] space-y-1 overflow-y-auto rounded-lg border border-bg-border bg-bg-raised p-1.5 pr-1">
          {sortedDrivers.length === 0 && (
            <li className="px-2 py-3 text-xs text-fg-muted">No active drivers on duty.</li>
          )}
          {sortedDrivers.map((driver) => {
            const tone = getRouteTone(driver.status);
            const isActive = selectedDriver?.id === driver.id;
            return (
              <li key={driver.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(driver.id)}
                  className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                    isActive ? "bg-bg-panel ring-1 ring-bg-border" : "hover:bg-bg-panel/60"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[tone]}`} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-fg">{driver.name}</span>
                    <span className="block truncate text-[10px] text-fg-muted">{driver.destination}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="rounded-lg border border-bg-border bg-bg-raised p-3">
          {selectedDriver ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">
                    {selectedDriver.name}
                    {selectedTruck && (
                      <span className="ml-1 font-normal text-fg-muted">· {selectedTruck.registration}</span>
                    )}
                  </p>
                  <p className="text-[11px] text-fg-muted">{selectedDriver.deliveryCount} deliveries this shift</p>
                </div>
                <Badge tone={getBadgeTone(selectedDriver.status)}>{selectedDriver.status.replace("_", " ")}</Badge>
              </div>

              <ol className="relative mt-4 space-y-4 pl-1">
                <RouteStop
                  label="Current location"
                  name={selectedDriver.currentLocation}
                  type={locationTypes.get(selectedDriver.currentLocation)}
                  tone={selectedTone}
                  isFirst
                />
                <RouteStop
                  label="Next stop"
                  name={selectedDriver.destination}
                  type={locationTypes.get(selectedDriver.destination)}
                  tone={selectedTone}
                  connectorTone={selectedTone}
                />
              </ol>
            </>
          ) : (
            <p className="text-xs text-fg-muted">Select a driver to view their route.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function RouteStop({
  label,
  name,
  type,
  tone,
  connectorTone,
  isFirst,
}: {
  label: string;
  name: string;
  type?: LocationType;
  tone: RouteTone;
  connectorTone?: RouteTone;
  isFirst?: boolean;
}) {
  return (
    <li className="relative pl-6">
      {!isFirst && (
        <span
          className={`absolute -top-4 left-[5px] h-4 w-px ${toneLine[connectorTone ?? "muted"]}`}
          aria-hidden
        />
      )}
      <span
        className={`absolute left-0 top-1 h-2.5 w-2.5 rounded-full ${toneDot[tone]} ${
          tone !== "muted" ? "animate-pulse-live" : ""
        }`}
        aria-hidden
      />
      <p className="text-[10px] uppercase tracking-wide text-fg-dim">{label}</p>
      <p className="truncate text-sm font-medium text-fg">{name}</p>
      {type && <p className="text-[11px] text-fg-muted">{typeLabels[type]}</p>}
    </li>
  );
}

function LegendDot({ tone, label }: { tone: RouteTone; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${toneDot[tone]}`} />
      {label}
    </span>
  );
}
