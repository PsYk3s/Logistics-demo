import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { StaffMember } from "@/domain/StaffMember";
import { Ticket } from "@/domain/Ticket";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { createDrivers } from "@/data/drivers";
import { createRoutes } from "@/data/routes";
import { createStaff } from "@/data/staff";
import { createTrucks } from "@/data/trucks";
import { getLocations } from "@/data/locations";
import { createEventId, createTicketId } from "@/lib/ids";
import { subtractMinutes } from "@/lib/dates";
import { randomInt, randomItem } from "@/lib/random";
import { DashboardSummary, SimulationState } from "@/types/simulation";

function buildInitialEvents(trucks: Truck[], drivers: TruckDriver[]): LogisticsEvent[] {
  const now = Date.now();
  const locations = getLocations();
  const events: LogisticsEvent[] = [];

  const onRouteTrucks = trucks.filter((truck) => truck.status === "ON_ROUTE").slice(0, 6);
  onRouteTrucks.forEach((truck, index) => {
    const driver = drivers.find((candidate) => candidate.id === truck.driverId);
    events.push(
      new LogisticsEvent({
        id: createEventId(),
        type: index % 2 === 0 ? "DEPARTURE" : "ARRIVAL",
        title:
          index % 2 === 0
            ? `${truck.registration} departed ${randomItem(locations).name}`
            : `Delivery completed at ${randomItem(locations).name}`,
        description: driver ? `Driver ${driver.name} confirmed status update.` : "Automated telemetry update.",
        timestamp: subtractMinutes(now, randomInt(2, 45)),
        status: "RESOLVED",
        severity: "NORMAL",
        truckId: truck.id,
        driverId: driver?.id,
        location: truck.location,
      })
    );
  });

  const delayedTrucks = trucks.filter((truck) => truck.status === "DELAYED");
  delayedTrucks.forEach((truck) => {
    const driver = drivers.find((candidate) => candidate.id === truck.driverId);
    const minutesLate = randomInt(12, 30);
    events.push(
      new LogisticsEvent({
        id: createEventId(),
        type: "DELAY",
        title: `${truck.location} delivery running ${minutesLate} minutes behind schedule`,
        description: "Traffic congestion is affecting the estimated arrival time.",
        timestamp: subtractMinutes(now, randomInt(1, 15)),
        status: "ACTIVE",
        severity: "WARNING",
        truckId: truck.id,
        driverId: driver?.id,
        location: truck.location,
        estimatedResolution: now + minutesLate * 60_000,
      })
    );
  });

  const emergencyCandidate = randomItem(trucks.filter((truck) => truck.status !== "AVAILABLE"));
  if (emergencyCandidate) {
    emergencyCandidate.status = "EMERGENCY";
    const driver = drivers.find((candidate) => candidate.id === emergencyCandidate.driverId);
    if (driver) driver.status = "EMERGENCY";
    events.push(
      new LogisticsEvent({
        id: createEventId(),
        type: "EMERGENCY",
        title: `Brake temperature warning received from ${emergencyCandidate.registration}`,
        description: "Temperature exceeded safe operating threshold during active route.",
        timestamp: subtractMinutes(now, randomInt(1, 6)),
        status: "ACTIVE",
        severity: "CRITICAL",
        truckId: emergencyCandidate.id,
        driverId: driver?.id,
        location: emergencyCandidate.location,
      })
    );
  }

  const loadingTruck = trucks.find((truck) => truck.status === "LOADING");
  if (loadingTruck) {
    events.push(
      new LogisticsEvent({
        id: createEventId(),
        type: "CUSTOMER_UPDATE",
        title: `Loading in progress at ${loadingTruck.location}`,
        description: `${loadingTruck.registration} is being loaded ahead of departure.`,
        timestamp: subtractMinutes(now, randomInt(1, 20)),
        status: "MONITORING",
        severity: "NORMAL",
        truckId: loadingTruck.id,
        location: loadingTruck.location,
      })
    );
  }

  const unloadingTruck = trucks.find((truck) => truck.status === "UNLOADING");
  if (unloadingTruck) {
    events.push(
      new LogisticsEvent({
        id: createEventId(),
        type: "ARRIVAL",
        title: `${unloadingTruck.registration} unloading at ${unloadingTruck.location}`,
        description: "Consignment handover in progress with customer receiving staff.",
        timestamp: subtractMinutes(now, randomInt(1, 10)),
        status: "MONITORING",
        severity: "NORMAL",
        truckId: unloadingTruck.id,
        location: unloadingTruck.location,
      })
    );
  }

  return events.sort((a, b) => b.timestamp - a.timestamp);
}

function buildInitialTickets(events: LogisticsEvent[], staff: StaffMember[]): Ticket[] {
  const now = Date.now();
  const tickets: Ticket[] = [];

  const criticalEvent = events.find((event) => event.severity === "CRITICAL");
  if (criticalEvent) {
    tickets.push(
      new Ticket({
        id: createTicketId(),
        ticketNumber: createTicketId(),
        title: `Urgent response required — ${criticalEvent.title}`,
        description: criticalEvent.description,
        priority: "URGENT",
        status: "IN_PROGRESS",
        createdAt: subtractMinutes(now, 4),
        updatedAt: subtractMinutes(now, 1),
        assignedTo: staff[0]?.id,
        truckId: criticalEvent.truckId,
        driverId: criticalEvent.driverId,
        eventId: criticalEvent.id,
      })
    );
  }

  const warningEvents = events.filter((event) => event.severity === "WARNING");
  warningEvents.forEach((event, index) => {
    tickets.push(
      new Ticket({
        id: createTicketId(),
        ticketNumber: createTicketId(),
        title: `Delay follow-up — ${event.location}`,
        description: event.description,
        priority: index === 0 ? "HIGH" : "MEDIUM",
        status: index === 0 ? "IN_PROGRESS" : "OPEN",
        createdAt: subtractMinutes(now, randomInt(5, 40)),
        updatedAt: subtractMinutes(now, randomInt(1, 10)),
        assignedTo: index === 0 ? staff[1]?.id : undefined,
        truckId: event.truckId,
        driverId: event.driverId,
        eventId: event.id,
      })
    );
  });

  const extraTitles = [
    "Fuel level below planned threshold",
    "Scheduled service due within 48 hours",
    "Customer requested revised delivery window",
    "Driver shift limit approaching",
  ];
  extraTitles.forEach((title, index) => {
    tickets.push(
      new Ticket({
        id: createTicketId(),
        ticketNumber: createTicketId(),
        title,
        description: "Raised automatically from fleet monitoring systems.",
        priority: index === 0 ? "MEDIUM" : "LOW",
        status: index % 2 === 0 ? "OPEN" : "WAITING",
        createdAt: subtractMinutes(now, randomInt(20, 180)),
        updatedAt: subtractMinutes(now, randomInt(5, 60)),
        assignedTo: undefined,
      })
    );
  });

  return tickets;
}

export function createInitialState(): SimulationState {
  const trucks = createTrucks();
  const drivers = createDrivers(trucks);
  const staff = createStaff();
  const routes = createRoutes();
  const events = buildInitialEvents(trucks, drivers);
  const tickets = buildInitialTickets(events, staff);

  return {
    events,
    trucks,
    drivers,
    staff,
    routes,
    tickets,
    currentTime: Date.now(),
    lastActivity: events[0]?.title ?? null,
  };
}

export function cloneState(state: SimulationState): SimulationState {
  return {
    ...state,
    events: [...state.events],
    trucks: [...state.trucks],
    drivers: [...state.drivers],
    tickets: [...state.tickets],
    staff: [...state.staff],
    routes: [...state.routes],
  };
}

export function calculateSummary(state: SimulationState): DashboardSummary {
  const activeEvents = state.events.filter((event) => event.status === "ACTIVE" || event.status === "ESCALATED" || event.status === "MONITORING");
  return {
    activeOperations: activeEvents.length,
    potentialDelays: state.trucks.filter((truck) => truck.status === "DELAYED").length,
    emergencies: state.trucks.filter((truck) => truck.status === "EMERGENCY").length,
    trucksOnRoute: state.trucks.filter((truck) => truck.status === "ON_ROUTE").length,
    openTickets: state.tickets.filter((ticket) => ticket.status !== "RESOLVED" && ticket.status !== "CLOSED").length,
    completedDeliveries: state.events.filter((event) => event.type === "DELIVERY" || (event.type === "ARRIVAL" && event.status === "RESOLVED")).length,
  };
}

