"use client";

import { useEffect, useState } from "react";
import { useCurrentStaff } from "@/state/DashboardProvider";
import { formatDateTime } from "@/lib/dates";
import { Avatar } from "@/components/ui/Avatar";
import { LiveIndicator } from "./LiveIndicator";

export function DashboardHeader() {
  const staff = useCurrentStaff();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-bg-border pb-4">
      <div>
        <h1 className="text-lg font-bold tracking-wide text-fg">LOGISTICS CONTROL CENTRE</h1>
        <div className="mt-1 flex items-center gap-3">
          <LiveIndicator />
          {now && <span className="text-[11px] text-fg-muted">{formatDateTime(now)}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-fg">{staff.name}</p>
          <p className="text-[11px] text-fg-muted">{staff.department}</p>
        </div>
        <Avatar initials={staff.avatar} online={staff.status === "ONLINE"} />
      </div>
    </header>
  );
}
