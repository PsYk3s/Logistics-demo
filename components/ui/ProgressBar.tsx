interface ProgressBarProps {
  value: number;
  tone?: "critical" | "warning" | "normal" | "info";
  className?: string;
}

const toneStyles: Record<NonNullable<ProgressBarProps["tone"]>, string> = {
  critical: "bg-status-critical",
  warning: "bg-status-warning",
  normal: "bg-status-normal",
  info: "bg-accent-blue",
};

export function ProgressBar({ value, tone = "info", className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-bg-border ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-500 ${toneStyles[tone]}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
