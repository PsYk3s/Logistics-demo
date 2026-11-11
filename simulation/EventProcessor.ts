import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { Ticket } from "@/domain/Ticket";
import { Truck } from "@/domain/Truck";
import { createTicketId } from "@/lib/ids";
import { chance, randomItem } from "@/lib/random";
import { getRandomLocation } from "@/data/locations";
import { SimulationState } from "@/types/simulation";
import { TruckStatus } from "@/types/logistics";
import { addEvent, addTicket, updateDriver, updateEvent, updateTicket, updateTruck } from "./StateMutator";

export function processEvent(state: SimulationState, event: LogisticsEvent): SimulationState {
  let next = addEvent(state, event);

  switch (event.type) {
    case "EMERGENCY": {
      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck) next = updateTruck(next, truck.id, truck.reportFault("critical"));

      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver) next = updateDriver(next, driver.id, driver.reportIncident());

      const ticket = new Ticket({
        id: createTicketId(),
        ticketNumber: createTicketId(),
        title: `Urgent response required — ${event.title}`,
        description: event.description,
        priority: "URGENT",
        status: "OPEN",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        truckId: event.truckId,
        driverId: event.driverId,
        eventId: event.id,
      });
      next = addTicket(next, ticket);
      break;
    }

    case "DELAY": {
      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck && truck.status === "ON_ROUTE") next = updateTruck(next, truck.id, setTruckStatus(truck, "DELAYED"));

      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver && driver.status === "ON_ROUTE") next = updateDriver(next, driver.id, driver.changeStatus("DELAYED"));
      break;
    }

    case "DEPARTURE": {
      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck) next = updateTruck(next, truck.id, truck.startRoute());
      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver) next = updateDriver(next, driver.id, driver.startRoute(event.location));
      break;
    }

    case "ARRIVAL": {
      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck) next = updateTruck(next, truck.id, truck.arrive(event.location));

      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver) next = updateDriver(next, driver.id, driver.arrive(event.location));
      break;
    }

    case "DELIVERY": {
      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck) next = updateTruck(next, truck.id, truck.startLoading());

      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver) {
        let nextDestination = getRandomLocation().name;
        while (nextDestination === driver.currentLocation) {
          nextDestination = getRandomLocation().name;
        }
        next = updateDriver(next, driver.id, driver.completeDelivery(nextDestination));
      }
      break;
    }

    default:
      break;
  }

  return next;
}


function setTruckStatus(truck: Truck, status: TruckStatus): Truck {
  return new Truck({ ...truck, status });
}

export function progressExistingEvents(state: SimulationState): SimulationState {
  let next = state;

  for (const event of state.events) {
    if (event.status === "RESOLVED") continue;

    if (event.severity === "WARNING" && chance(0.15)) {
      const resolved = event.resolve();
      next = updateEvent(next, event.id, resolved);

      if (event.type === "DELAY") {
        const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
        if (truck && truck.status === "DELAYED") next = updateTruck(next, truck.id, setTruckStatus(truck, "ON_ROUTE"));

        const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
        if (driver && driver.status === "DELAYED") next = updateDriver(next, driver.id, driver.changeStatus("ON_ROUTE"));
      }

      const linkedTicket = next.tickets.find((ticket) => ticket.eventId === event.id && ticket.status !== "RESOLVED");
      if (linkedTicket) next = updateTicket(next, linkedTicket.id, linkedTicket.resolve());
      break;
    }

    if (event.severity === "CRITICAL" && chance(0.1)) {
      const resolved = event.resolve();
      next = updateEvent(next, event.id, resolved);

      const truck = next.trucks.find((candidate) => candidate.id === event.truckId);
      if (truck) next = updateTruck(next, truck.id, setTruckStatus(truck, "ON_ROUTE"));

      const driver = next.drivers.find((candidate) => candidate.id === event.driverId);
      if (driver) next = updateDriver(next, driver.id, driver.changeStatus("ON_ROUTE"));

      const linkedTicket = next.tickets.find((ticket) => ticket.eventId === event.id && ticket.status !== "RESOLVED");
      if (linkedTicket) next = updateTicket(next, linkedTicket.id, linkedTicket.resolve());
      break;
    }
  }

  return next;
}

export function progressTickets(state: SimulationState): SimulationState {
  let next = state;

  for (const ticket of state.tickets) {
    if (ticket.status === "OPEN" && !ticket.assignedTo && chance(0.3)) {
      const staffMember = randomItem(next.staff.filter((member) => member.status === "ONLINE"));
      if (staffMember) {
        next = updateTicket(next, ticket.id, ticket.assign(staffMember.id));
        break;
      }
      continue;
    }

    if (ticket.status === "IN_PROGRESS" && ticket.priority !== "URGENT" && chance(0.15)) {
      next = updateTicket(next, ticket.id, ticket.resolve());
      break;
    }

    if (ticket.status === "RESOLVED" && chance(0.25)) {
      next = updateTicket(next, ticket.id, ticket.close());
      break;
    }
  }

  return next;
}

