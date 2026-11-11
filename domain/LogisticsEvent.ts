import {
  EventSeverity,
  EventStatusType,
  EventType,
  LogisticsEventData,
} from "@/types/events";

export class LogisticsEvent {
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
  lastUpdated: number;

  constructor(data: LogisticsEventData) {
    this.id = data.id;
    this.type = data.type;
    this.title = data.title;
    this.description = data.description;
    this.timestamp = data.timestamp;
    this.status = data.status;
    this.severity = data.severity;
    this.truckId = data.truckId;
    this.driverId = data.driverId;
    this.location = data.location;
    this.estimatedResolution = data.estimatedResolution;
    this.resolvedAt = data.resolvedAt;
    this.lastUpdated = data.lastUpdated ?? data.timestamp;
  }

  resolve(): LogisticsEvent {
    return new LogisticsEvent({
      ...this,
      status: "RESOLVED",
      resolvedAt: Date.now(),
      lastUpdated: Date.now(),
    });
  }

  escalate(): LogisticsEvent {
    return new LogisticsEvent({
      ...this,
      severity: "CRITICAL",
      status: "ESCALATED",
      lastUpdated: Date.now(),
    });
  }

  updateStatus(newStatus: EventStatusType): LogisticsEvent {
    return new LogisticsEvent({ ...this, status: newStatus, lastUpdated: Date.now() });
  }

  increaseSeverity(): LogisticsEvent {
    const next: EventSeverity =
      this.severity === "NORMAL" ? "WARNING" : this.severity === "WARNING" ? "CRITICAL" : "CRITICAL";
    return new LogisticsEvent({ ...this, severity: next, lastUpdated: Date.now() });
  }

  decreaseSeverity(): LogisticsEvent {
    const next: EventSeverity =
      this.severity === "CRITICAL" ? "WARNING" : this.severity === "WARNING" ? "NORMAL" : "NORMAL";
    return new LogisticsEvent({ ...this, severity: next, lastUpdated: Date.now() });
  }
}
