import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { createEventId } from "@/lib/ids";
import { randomInt } from "@/lib/random";
import { getRandomLocation } from "@/data/locations";
import { SimulationState } from "@/types/simulation";

// Trucks/drivers cycle through LOADING -> (DEPARTURE) -> ON_ROUTE ->
// (ARRIVAL) -> UNLOADING -> (DELIVERY) -> LOADING, always together, so
// "trucks on route" and "driver routes" never disagree.
export function generateDelivery(state: SimulationState): LogisticsEvent | null {
  const candidates = state.trucks.filter((truck) => ["LOADING", "ON_ROUTE", "UNLOADING"].includes(truck.status));
  const truck = candidates[Math.floor(Math.random() * candidates.length)];
  if (!truck) return null;

  const driver = state.drivers.find((candidate) => candidate.id === truck.driverId);
  const consignment = `PB-${randomInt(10000, 99999)}`;

  if (truck.status === "LOADING") {
    const destination = driver?.destination ?? getRandomLocation().name;
    return new LogisticsEvent({
      id: createEventId(),
      type: "DEPARTURE",
      title: `${truck.registration} departed ${truck.location}`,
      description: driver ? `Confirmed by driver ${driver.name}.` : "Confirmed via fleet telemetry.",
      timestamp: Date.now(),
      status: "RESOLVED",
      severity: "NORMAL",
      truckId: truck.id,
      driverId: driver?.id,
      location: destination,
    });
  }

  if (truck.status === "ON_ROUTE") {
    const destination = driver?.destination ?? getRandomLocation().name;
    return new LogisticsEvent({
      id: createEventId(),
      type: "ARRIVAL",
      title: `${truck.registration} arrived at ${destination}`,
      description: driver ? `Confirmed by driver ${driver.name}.` : "Confirmed via fleet telemetry.",
      timestamp: Date.now(),
      status: "RESOLVED",
      severity: "NORMAL",
      truckId: truck.id,
      driverId: driver?.id,
      location: destination,
    });
  }

  return new LogisticsEvent({
    id: createEventId(),
    type: "DELIVERY",
    title: `Consignment ${consignment} handed over at ${truck.location}`,
    description: driver ? `Confirmed by driver ${driver.name}.` : "Confirmed via fleet telemetry.",
    timestamp: Date.now(),
    status: "RESOLVED",
    severity: "NORMAL",
    truckId: truck.id,
    driverId: driver?.id,
    location: truck.location,
  });
}
