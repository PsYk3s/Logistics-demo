"use client";

import { useState } from "react";
import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { formatRelativeTime } from "@/lib/dates";
import { EventStatus } from "./EventStatus";

interface EventCardProps {
  event: LogisticsEvent;
  driverName?: string;
  truckRegistration?: string;
}

function getCardStyle(event: LogisticsEvent): string {
  if (event.status === "RESOLVED") return "border-bg-border bg-bg-panel/60 opacity-70";
  if (event.severity === "CRITICAL") return "border-status-critical/50 bg-status-critical/5";
  if (event.severity === "WARNING") return "border-status-warning/40 bg-status-warning/5";
  return "border-bg-border bg-bg-panel";
}

export function EventCard({ event, driverName, truckRegistration }: EventCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border p-4 transition-colors ${getCardStyle(event)}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <EventStatus severity={event.severity} status={event.status} />
          <p className="min-w-0 truncate text-sm font-medium text-fg">{event.title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="whitespace-nowrap text-[11px] text-fg-muted">{formatRelativeTime(event.timestamp)}</span>
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
          <p className="text-xs text-fg-muted">{event.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-fg-muted">
            <span>{event.location}</span>
            {truckRegistration && <span>{truckRegistration}</span>}
            {driverName && <span>{driverName}</span>}
          </div>
        </div>
      )}
    </div>
  );
}

