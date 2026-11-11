import { LogisticsEvent } from "@/domain/LogisticsEvent";
import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { createEventId } from "@/lib/ids";
import { SimulationState } from "@/types/simulation";

export function generateEmergency(state: SimulationState): LogisticsEvent | null {
  const candidates = state.trucks.filter((truck) =>
    ["ON_ROUTE", "LOADING", "UNLOADING"].includes(truck.status)
  );
  const truck: Truck | undefined = candidates[Math.floor(Math.random() * candidates.length)];
  if (!truck) return null;

  const driver: TruckDriver | undefined = state.drivers.find((candidate) => candidate.id === truck.driverId);
  const titles = [
    `Brake temperature warning received from ${truck.registration}`,
    `Mechanical fault detected on ${truck.registration} during active route`,
    `Driver emergency alert received from ${truck.registration}`,
    `${truck.registration} stopped on the shoulder — mechanical inspection required`,
  ];

  return new LogisticsEvent({
    id: createEventId(),
    type: "EMERGENCY",
    title: titles[Math.floor(Math.random() * titles.length)],
    description: "Vehicle telemetry exceeded safe operating threshold. Immediate dispatcher attention required.",
    timestamp: Date.now(),
    status: "ACTIVE",
    severity: "CRITICAL",
    truckId: truck.id,
    driverId: driver?.id,
    location: truck.location,
  });
}
