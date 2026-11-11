import { EventSeverity, EventStatusType } from "@/types/events";
import { StatusDot } from "@/components/ui/StatusDot";

interface EventStatusProps {
  severity: EventSeverity;
  status: EventStatusType;
}

const labelMap: Record<EventSeverity, string> = {
  CRITICAL: "EMERGENCY",
  WARNING: "POTENTIAL DELAY",
  NORMAL: "NORMAL",
};

const textColor: Record<EventSeverity, string> = {
  CRITICAL: "text-status-critical",
  WARNING: "text-status-warning",
  NORMAL: "text-status-normal",
};

export function EventStatus({ severity, status }: EventStatusProps) {
  const isResolved = status === "RESOLVED";
  const label = isResolved ? "RESOLVED" : labelMap[severity];
  const color = isResolved ? "text-fg-muted" : textColor[severity];

  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider ${color}`}>
      <StatusDot severity={isResolved ? "RESOLVED" : severity} pulse={!isResolved && severity === "CRITICAL"} />
      {label}
    </span>
  );
}
