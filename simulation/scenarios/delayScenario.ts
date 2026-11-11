import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { createEventId } from "@/lib/ids";
import { randomInt } from "@/lib/random";
import { SimulationState } from "@/types/simulation";

export function generateDelay(state: SimulationState): LogisticsEvent | null {
  const candidates = state.trucks.filter((truck) => truck.status === "ON_ROUTE");
  const truck = candidates[Math.floor(Math.random() * candidates.length)];
  if (!truck) return null;

  const driver = state.drivers.find((candidate) => candidate.id === truck.driverId);
  const minutesLate = randomInt(10, 35);
  const causes = [
    `Traffic congestion detected near ${truck.location}`,
    `${truck.location} delivery running ${minutesLate} minutes behind schedule`,
    `Route delay reported approaching ${truck.location}`,
  ];

  return new LogisticsEvent({
    id: createEventId(),
    type: "DELAY",
    title: causes[Math.floor(Math.random() * causes.length)],
    description: "Estimated arrival time has shifted due to road conditions.",
    timestamp: Date.now(),
    status: "ACTIVE",
    severity: "WARNING",
    truckId: truck.id,
    driverId: driver?.id,
    location: truck.location,
    estimatedResolution: Date.now() + minutesLate * 60_000,
  });
}
