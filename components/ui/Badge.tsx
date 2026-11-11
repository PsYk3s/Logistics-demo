interface BadgeProps {
  children: React.ReactNode;
  tone?: "critical" | "warning" | "normal" | "resolved" | "info" | "neutral";
  className?: string;
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  critical: "bg-status-critical/15 text-status-critical border-status-critical/40",
  warning: "bg-status-warning/15 text-status-warning border-status-warning/40",
  normal: "bg-status-normal/15 text-status-normal border-status-normal/40",
  resolved: "bg-status-resolved/15 text-fg-muted border-status-resolved/40",
  info: "bg-accent-cyan/15 text-accent-cyan border-accent-cyan/40",
  neutral: "bg-bg-raised text-fg-muted border-bg-border",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${toneStyles[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
