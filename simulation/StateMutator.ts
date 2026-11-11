import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { Ticket } from "@/domain/Ticket";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { SimulationState } from "@/types/simulation";
import { cloneState } from "./SimulationState";

export function updateTruck(state: SimulationState, truckId: string, updatedTruck: Truck): SimulationState {
  const next = cloneState(state);
  next.trucks = next.trucks.map((truck) => (truck.id === truckId ? updatedTruck : truck));
  return next;
}

export function updateDriver(state: SimulationState, driverId: string, updatedDriver: TruckDriver): SimulationState {
  const next = cloneState(state);
  next.drivers = next.drivers.map((driver) => (driver.id === driverId ? updatedDriver : driver));
  return next;
}

export function updateEvent(state: SimulationState, eventId: string, updatedEvent: LogisticsEvent): SimulationState {
  const next = cloneState(state);
  next.events = next.events.map((event) => (event.id === eventId ? updatedEvent : event));
  return next;
}

export function updateTicket(state: SimulationState, ticketId: string, updatedTicket: Ticket): SimulationState {
  const next = cloneState(state);
  next.tickets = next.tickets.map((ticket) => (ticket.id === ticketId ? updatedTicket : ticket));
  return next;
}

export function addEvent(state: SimulationState, event: LogisticsEvent): SimulationState {
  const next = cloneState(state);
  next.events = [event, ...next.events].slice(0, 60);
  next.lastActivity = event.title;
  return next;
}

export function addTicket(state: SimulationState, ticket: Ticket): SimulationState {
  const next = cloneState(state);
  next.tickets = [ticket, ...next.tickets].slice(0, 40);
  return next;
}
