import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { createEventId } from "@/lib/ids";
import { randomItem } from "@/lib/random";
import { SimulationState } from "@/types/simulation";

export function generateVehicleAlert(state: SimulationState): LogisticsEvent | null {
  const truck = randomItem(state.trucks.filter((candidate) => candidate.status !== "EMERGENCY"));
  if (!truck) return null;

  const driver = state.drivers.find((candidate) => candidate.id === truck.driverId);
  const alerts = [
    `Fuel level below planned threshold on ${truck.registration}`,
    `Tyre pressure warning reported on ${truck.registration}`,
    `Scheduled service approaching for ${truck.registration}`,
    `Engine temperature trending upward on ${truck.registration}`,
  ];

  return new LogisticsEvent({
    id: createEventId(),
    type: "VEHICLE_ALERT",
    title: randomItem(alerts),
    description: "Fleet telemetry flagged this reading for monitoring.",
    timestamp: Date.now(),
    status: "MONITORING",
    severity: "WARNING",
    truckId: truck.id,
    driverId: driver?.id,
    location: truck.location,
  });
}
