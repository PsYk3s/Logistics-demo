import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { StaffMember } from "@/domain/StaffMember";
import { Ticket } from "@/domain/Ticket";
import { Truck } from "@/domain/Truck";
import { calculateSummary } from "@/simulation/SimulationState";
import { DashboardSummary, SimulationState } from "@/types/simulation";

export function getActiveEvents(state: SimulationState): LogisticsEvent[] {
  return state.events.filter((event) => event.status !== "RESOLVED");
}

export function getCriticalEvents(state: SimulationState): LogisticsEvent[] {
  return state.events.filter((event) => event.severity === "CRITICAL" && event.status !== "RESOLVED");
}

export function getWarningEvents(state: SimulationState): LogisticsEvent[] {
  return state.events.filter((event) => event.severity === "WARNING" && event.status !== "RESOLVED");
}

export function getOpenTickets(state: SimulationState): Ticket[] {
  return state.tickets.filter((ticket) => ticket.status !== "RESOLVED" && ticket.status !== "CLOSED");
}

export function getActiveTrucks(state: SimulationState): Truck[] {
  return state.trucks.filter((truck) => truck.status !== "AVAILABLE");
}

export function getDelayedTrucks(state: SimulationState): Truck[] {
  return state.trucks.filter((truck) => truck.status === "DELAYED" || truck.status === "EMERGENCY");
}

export function getOnlineStaff(state: SimulationState): StaffMember[] {
  return state.staff.filter((member) => member.status === "ONLINE");
}

export function getDashboardSummary(state: SimulationState): DashboardSummary {
  return calculateSummary(state);
}
