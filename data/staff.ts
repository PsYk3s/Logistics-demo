import { StaffMember } from "@/domain/StaffMember";
import { StaffRole, StaffStatus } from "@/types/logistics";

interface StaffSeed {
  name: string;
  role: StaffRole;
  department: string;
  status: StaffStatus;
}

const seeds: StaffSeed[] = [
  { name: "Sarah Jacobs", role: "FLEET_MANAGER", department: "Fleet Operations", status: "ONLINE" },
  { name: "David Ndlovu", role: "DISPATCHER", department: "Dispatch", status: "ONLINE" },
  { name: "Michelle Pretorius", role: "OPERATIONS_MANAGER", department: "Operations", status: "BUSY" },
  { name: "Kagiso Molefe", role: "CONTROL_ROOM", department: "Control Room", status: "ONLINE" },
  { name: "Anele Dube", role: "SUPERVISOR", department: "Fleet Operations", status: "AWAY" },
  { name: "Werner Steyn", role: "DISPATCHER", department: "Dispatch", status: "ONLINE" },
  { name: "Nomsa Khumalo", role: "OPERATIONS_MANAGER", department: "Regional Operations", status: "OFFLINE" },
];

const managerRoles: StaffRole[] = ["FLEET_MANAGER", "OPERATIONS_MANAGER", "SUPERVISOR"];

export function createStaff(): StaffMember[] {
  const now = Date.now();
  return seeds.map(
    (seed, index) =>
      new StaffMember({
        id: `STF-${index + 1}`,
        name: seed.name,
        role: seed.role,
        department: seed.department,
        avatar: seed.name
          .split(" ")
          .map((part) => part[0])
          .join(""),
        status: seed.status,
        lastActive: now,
      })
  );
}

export function getCurrentStaff(staff: StaffMember[]): StaffMember {
  return staff[0];
}

export function getManagersOnDuty(staff: StaffMember[]): StaffMember[] {
  return staff.filter((member) => managerRoles.includes(member.role)).slice(0, 4);
}

