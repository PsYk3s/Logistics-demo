export type EventType =
  | "DELIVERY"
  | "DEPARTURE"
  | "ARRIVAL"
  | "DELAY"
  | "BREAKDOWN"
  | "EMERGENCY"
  | "ROUTE_CHANGE"
  | "DRIVER_ALERT"
  | "VEHICLE_ALERT"
  | "CUSTOMER_UPDATE"
  | "TICKET_CREATED"
  | "TICKET_RESOLVED";

export type EventSeverity = "NORMAL" | "WARNING" | "CRITICAL";

export type EventStatusType = "ACTIVE" | "MONITORING" | "RESOLVED" | "ESCALATED";

export interface LogisticsEventData {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: number;
  status: EventStatusType;
  severity: EventSeverity;
  truckId?: string;
  driverId?: string;
  location: string;
  estimatedResolution?: number;
  resolvedAt?: number;
  lastUpdated?: number;
}
