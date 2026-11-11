export type StaffRole =
  | "DISPATCHER"
  | "FLEET_MANAGER"
  | "OPERATIONS_MANAGER"
  | "SUPERVISOR"
  | "CONTROL_ROOM";

export type StaffStatus = "ONLINE" | "AWAY" | "BUSY" | "OFFLINE";

export type DriverStatus =
  | "ON_ROUTE"
  | "LOADING"
  | "UNLOADING"
  | "RESTING"
  | "DELAYED"
  | "EMERGENCY"
  | "OFF_DUTY";

export type TruckStatus =
  | "AVAILABLE"
  | "ON_ROUTE"
  | "LOADING"
  | "UNLOADING"
  | "DELAYED"
  | "MAINTENANCE"
  | "BREAKDOWN"
  | "EMERGENCY";

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "WAITING" | "RESOLVED" | "CLOSED";

export interface Route {
  id: string;
  origin: string;
  destination: string;
  corridor: string;
  distanceKm: number;
}

export type LocationType =
  | "DEPOT"
  | "DISTRIBUTION_CENTRE"
  | "HIGHWAY"
  | "INTERCHANGE"
  | "CUSTOMER"
  | "FUEL_STATION"
  | "SERVICE_CENTRE";

export interface Location {
  name: string;
  type: LocationType;
  x: number;
  y: number;
}
