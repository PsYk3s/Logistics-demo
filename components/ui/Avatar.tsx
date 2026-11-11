interface AvatarProps {
  initials: string;
  online?: boolean;
  size?: "sm" | "md";
}

export function Avatar({ initials, online, size = "md" }: AvatarProps) {
  const dimension = size === "sm" ? "h-7 w-7 text-[11px]" : "h-9 w-9 text-xs";

  return (
    <span className="relative inline-flex">
      <span
        className={`flex ${dimension} items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-purple font-semibold text-bg`}
      >
        {initials}
      </span>
      {online !== undefined && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-bg-panel ${
            online ? "bg-status-normal" : "bg-fg-dim"
          }`}
        />
      )}
    </span>
  );
}
