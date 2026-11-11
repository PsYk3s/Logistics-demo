"use client";

import { useDashboard } from "@/state/DashboardProvider";
import { DashboardHeader } from "./DashboardHeader";
import { OperationsSummary } from "./OperationsSummary";
import { EventFeed } from "./EventFeed";
import { TruckActivity } from "./TruckActivity";
import { DriverActivity } from "./DriverActivity";
import { DriverMap } from "./DriverMap";
import { TicketPanel } from "./TicketPanel";
import { ActivityTimeline } from "./ActivityTimeline";

function ViewContent() {
  const { view } = useDashboard();

  switch (view) {
    case "LIVE_OPERATIONS":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          <EventFeed />
          <ActivityTimeline />
        </div>
      );
    case "FLEET":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4">
          <TruckActivity />
        </div>
      );
    case "DRIVERS":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4">
          <DriverMap />
          <DriverActivity />
        </div>
      );
    case "TICKETS":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4">
          <TicketPanel />
        </div>
      );
    case "EVENTS":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4">
          <ActivityTimeline />
        </div>
      );
    case "REPORTS":
      return (
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          <ActivityTimeline />
          <TicketPanel />
        </div>
      );
    case "OVERVIEW":
    default:
      return (
        <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <EventFeed />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
            <TruckActivity />
            <DriverActivity />
            <TicketPanel />
            <ActivityTimeline />
          </div>
        </div>
      );
  }
}

export function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-4 p-4 lg:p-6">
      <DashboardHeader />
      <OperationsSummary />
      <ViewContent />
    </div>
  );
}
