"use client";

import { useEffect, useState } from "react";

interface WorldClockZone {
  label: string;
  timeZone: string;
}

const zones: WorldClockZone[] = [
  { label: "Johannesburg", timeZone: "Africa/Johannesburg" },
  { label: "London", timeZone: "Europe/London" },
  { label: "Dubai", timeZone: "Asia/Dubai" },
];

function formatZoneTime(timeZone: string, now: number): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);
}

export function WorldClocks() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  return (
    <div className="flex items-center gap-3 text-[11px] text-fg-muted">
      {zones.map((zone) => (
        <span key={zone.timeZone} className="flex items-center gap-1">
          <span className="font-medium text-fg">{zone.label}</span>
          <span className="font-mono">{formatZoneTime(zone.timeZone, now)}</span>
        </span>
      ))}
    </div>
  );
}
