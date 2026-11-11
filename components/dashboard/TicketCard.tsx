"use client";

import { useState } from "react";
import { StaffMember } from "@/domain/StaffMember";
import { Ticket } from "@/domain/Ticket";
import { formatRelativeTime } from "@/lib/dates";
import { Badge } from "@/components/ui/Badge";

interface TicketCardProps {
  ticket: Ticket;
  assignee?: StaffMember;
}

const priorityTone: Record<Ticket["priority"], "critical" | "warning" | "info" | "neutral"> = {
  URGENT: "critical",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "neutral",
};

export function TicketCard({ ticket, assignee }: TicketCardProps) {
  const [open, setOpen] = useState(false);
  const isUrgent = ticket.priority === "URGENT" && ticket.status !== "RESOLVED" && ticket.status !== "CLOSED";

  return (
    <div
      className={`rounded-lg border p-3 ${
        isUrgent ? "border-status-critical/50 bg-status-critical/5" : "border-bg-border bg-bg-raised"
      }`}
    >
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-2 text-left">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 font-mono text-[11px] text-fg-muted">#{ticket.ticketNumber}</span>
          <p className="truncate text-sm font-medium text-fg">{ticket.title}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Badge tone={priorityTone[ticket.priority]}>{ticket.priority}</Badge>
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
        <div className="mt-2 border-t border-bg-border/60 pt-2">
          <div className="flex items-center justify-between text-[11px] text-fg-muted">
            <span>{ticket.status.replace("_", " ")}</span>
            <span>{formatRelativeTime(ticket.createdAt)}</span>
          </div>
          {assignee && <p className="mt-1 text-[11px] text-fg-muted">Assigned to {assignee.name}</p>}
        </div>
      )}
    </div>
  );
}

