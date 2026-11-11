import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { StaffMember } from "@/domain/StaffMember";
import { Ticket } from "@/domain/Ticket";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { Route } from "@/types/logistics";

export interface SimulationState {
  events: LogisticsEvent[];
  trucks: Truck[];
  drivers: TruckDriver[];
  tickets: Ticket[];
  staff: StaffMember[];
  routes: Route[];
  currentTime: number;
  lastActivity: string | null;
}

export interface DashboardSummary {
  activeOperations: number;
  potentialDelays: number;
  emergencies: number;
  trucksOnRoute: number;
  openTickets: number;
  completedDeliveries: number;
}
