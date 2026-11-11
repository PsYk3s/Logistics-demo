import { EventSeverity } from "@/types/events";

interface StatusDotProps {
  severity: EventSeverity | "RESOLVED";
  pulse?: boolean;
  className?: string;
}

const colorMap: Record<string, string> = {
  CRITICAL: "bg-status-critical",
  WARNING: "bg-status-warning",
  NORMAL: "bg-status-normal",
  RESOLVED: "bg-status-resolved",
};

export function StatusDot({ severity, pulse, className = "" }: StatusDotProps) {
  const color = colorMap[severity] ?? colorMap.NORMAL;
  const shouldPulse = pulse ?? severity === "CRITICAL";

  return (
    <span className={`relative inline-flex h-2.5 w-2.5 ${className}`}>
      {shouldPulse && (
        <span className={`absolute inline-flex h-full w-full rounded-full ${color} animate-pulse-critical opacity-75`} />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}
