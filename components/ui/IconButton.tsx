import { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export function IconButton({ icon, label, className = "", ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg border border-bg-border bg-bg-raised text-fg-muted transition-colors hover:border-accent-blue/50 hover:text-accent-blue ${className}`}
      {...rest}
    >
      {icon}
    </button>
  );
}
