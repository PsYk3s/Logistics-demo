import { StaffRole, StaffStatus } from "@/types/logistics";

export interface StaffMemberData {
  id: string;
  name: string;
  role: StaffRole;
  department: string;
  avatar: string;
  status: StaffStatus;
  lastActive: number;
}

export class StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  department: string;
  avatar: string;
  status: StaffStatus;
  lastActive: number;

  constructor(data: StaffMemberData) {
    this.id = data.id;
    this.name = data.name;
    this.role = data.role;
    this.department = data.department;
    this.avatar = data.avatar;
    this.status = data.status;
    this.lastActive = data.lastActive;
  }

  login(): StaffMember {
    return new StaffMember({ ...this, status: "ONLINE", lastActive: Date.now() });
  }

  logout(): StaffMember {
    return new StaffMember({ ...this, status: "OFFLINE" });
  }

  setStatus(status: StaffStatus): StaffMember {
    return new StaffMember({ ...this, status, lastActive: Date.now() });
  }

  assignEvent<T extends { assignedTo?: string }>(event: T): T {
    return { ...event, assignedTo: this.id };
  }

  assignTicket<T extends { assignedTo?: string }>(ticket: T): T {
    return { ...ticket, assignedTo: this.id };
  }
}
