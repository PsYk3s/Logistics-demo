import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { createEventId } from "@/lib/ids";
import { randomItem, weightedRandom } from "@/lib/random";
import { SimulationState } from "@/types/simulation";
import { generateEmergency } from "./scenarios/emergencyScenario";
import { generateDelay } from "./scenarios/delayScenario";
import { generateDelivery } from "./scenarios/deliveryScenario";
import { generateVehicleAlert } from "./scenarios/vehicleScenario";

type ActivityCategory = "NORMAL" | "DELIVERY" | "VEHICLE" | "DELAY" | "DRIVER" | "TICKET" | "EMERGENCY";

const weights: Record<ActivityCategory, number> = {
  NORMAL: 52,
  DELIVERY: 15,
  VEHICLE: 10,
  DELAY: 10,
  DRIVER: 8,
  TICKET: 4,
  EMERGENCY: 1,
};

function generateDriverAlert(state: SimulationState): LogisticsEvent | null {
  const driver = randomItem(state.drivers.filter((candidate) => candidate.status !== "EMERGENCY"));
  if (!driver) return null;
  const truck = state.trucks.find((candidate) => candidate.id === driver.truckId);

  const alerts = [
    `Driver ${driver.name} reported updated ETA`,
    `Driver ${driver.name} confirmed rest break at ${driver.currentLocation}`,
    `Driver ${driver.name} reported roadside obstruction near ${driver.currentLocation}`,
    `Driver ${driver.name} approaching scheduled shift limit`,
  ];

  return new LogisticsEvent({
    id: createEventId(),
    type: "DRIVER_ALERT",
    title: randomItem(alerts),
    description: "Reported through the driver mobile application.",
    timestamp: Date.now(),
    status: "MONITORING",
    severity: "NORMAL",
    truckId: truck?.id,
    driverId: driver.id,
    location: driver.currentLocation,
  });
}

function generateNormalActivity(state: SimulationState): LogisticsEvent | null {
  const truck = randomItem(state.trucks);
  if (!truck) return null;
  const driver = state.drivers.find((candidate) => candidate.id === truck.driverId);

  const activities = [
    `Route progressing normally for ${truck.registration}`,
    `${truck.registration} arrived at ${truck.location}`,
    `Loading completed at ${truck.location}`,
    `Customer delivery window confirmed for ${truck.registration}`,
  ];

  return new LogisticsEvent({
    id: createEventId(),
    type: "CUSTOMER_UPDATE",
    title: randomItem(activities),
    description: driver ? `Driver ${driver.name} on schedule.` : "Automated status update.",
    timestamp: Date.now(),
    status: "RESOLVED",
    severity: "NORMAL",
    truckId: truck.id,
    driverId: driver?.id,
    location: truck.location,
  });
}

function generateTicketEvent(state: SimulationState): LogisticsEvent | null {
  const openTicket = randomItem(state.tickets.filter((ticket) => ticket.status === "OPEN" || ticket.status === "IN_PROGRESS"));
  if (!openTicket) return null;

  return new LogisticsEvent({
    id: createEventId(),
    type: "TICKET_CREATED",
    title: `Ticket ${openTicket.ticketNumber} updated — ${openTicket.title}`,
    description: "Operational ticket queue updated by control room.",
    timestamp: Date.now(),
    status: "MONITORING",
    severity: "NORMAL",
    location: "Control Room",
  });
}

export function generate(state: SimulationState): LogisticsEvent | null {
  const category = weightedRandom(weights);

  switch (category) {
    case "EMERGENCY":
      return generateEmergency(state);
    case "DELAY":
      return generateDelay(state);
    case "DELIVERY":
      return generateDelivery(state);
    case "VEHICLE":
      return generateVehicleAlert(state);
    case "DRIVER":
      return generateDriverAlert(state);
    case "TICKET":
      return generateTicketEvent(state);
    case "NORMAL":
    default:
      return generateNormalActivity(state);
  }
}
