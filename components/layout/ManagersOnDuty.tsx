"use client";

import { StaffMember } from "@/domain/StaffMember";
import { useDashboard } from "@/state/DashboardProvider";
import { getManagersOnDuty } from "@/data/staff";
import { Avatar } from "@/components/ui/Avatar";

function isOnline(status: StaffMember["status"]): boolean {
  return status === "ONLINE" || status === "BUSY";
}

function slackHref(manager: StaffMember): string {
  const handle = manager.name.toLowerCase().replace(/\s+/g, ".");
  return `slack://user?team=T0LOGISTICS&username=${handle}`;
}

export function ManagersOnDuty() {
  const { simulation } = useDashboard();
  const managers = getManagersOnDuty(simulation.staff);

  return (
    <div className="mt-6 border-t border-bg-border pt-4">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-fg-muted">Managers On Duty</h3>
      <div className="flex flex-col gap-2">
        {managers.map((manager) => {
          const online = isOnline(manager.status);
          return (
            <div key={manager.id} className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-bg-raised">
              <Avatar initials={manager.avatar} online={online} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-fg">{manager.name}</p>
                <p className="truncate text-[10px] text-fg-muted">
                  {online ? "Online" : "Offline"} · {manager.department}
                </p>
              </div>
              <a
                href={online ? slackHref(manager) : undefined}
                aria-disabled={!online}
                title={online ? `Message ${manager.name} on Slack` : `${manager.name} is offline`}
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${
                  online
                    ? "text-accent-purple hover:bg-accent-purple/15"
                    : "cursor-not-allowed text-fg-dim"
                }`}
                onClick={(event) => {
                  if (!online) event.preventDefault();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  />
                </svg>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
