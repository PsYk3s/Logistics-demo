import { TicketPriority, TicketStatus } from "@/types/logistics";

export interface TicketData {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: number;
  updatedAt: number;
  assignedTo?: string;
  truckId?: string;
  driverId?: string;
  eventId?: string;
}

export class Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: number;
  updatedAt: number;
  assignedTo?: string;
  truckId?: string;
  driverId?: string;
  eventId?: string;

  constructor(data: TicketData) {
    this.id = data.id;
    this.ticketNumber = data.ticketNumber;
    this.title = data.title;
    this.description = data.description;
    this.priority = data.priority;
    this.status = data.status;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.assignedTo = data.assignedTo;
    this.truckId = data.truckId;
    this.driverId = data.driverId;
    this.eventId = data.eventId;
  }

  assign(staffId: string): Ticket {
    return new Ticket({ ...this, assignedTo: staffId, status: "IN_PROGRESS", updatedAt: Date.now() });
  }

  startWork(): Ticket {
    return new Ticket({ ...this, status: "IN_PROGRESS", updatedAt: Date.now() });
  }

  putOnHold(): Ticket {
    return new Ticket({ ...this, status: "WAITING", updatedAt: Date.now() });
  }

  resolve(): Ticket {
    return new Ticket({ ...this, status: "RESOLVED", updatedAt: Date.now() });
  }

  close(): Ticket {
    return new Ticket({ ...this, status: "CLOSED", updatedAt: Date.now() });
  }

  reopen(): Ticket {
    return new Ticket({ ...this, status: "OPEN", updatedAt: Date.now() });
  }

  changePriority(priority: TicketPriority): Ticket {
    return new Ticket({ ...this, priority, updatedAt: Date.now() });
  }
}
