import { Truck } from "@/domain/Truck";
import { TruckStatus } from "@/types/logistics";
import { randomFloat, randomInt, randomItem } from "@/lib/random";
import { getRandomLocation } from "./locations";

const models = [
  "Freightliner Cascadia",
  "Volvo FH16",
  "Scania R500",
  "MAN TGX",
  "Mercedes-Benz Actros",
  "Isuzu FVZ",
  "DAF XF",
  "UD Quon",
];

const statusPool: TruckStatus[] = [
  "ON_ROUTE",
  "ON_ROUTE",
  "ON_ROUTE",
  "LOADING",
  "UNLOADING",
  "DELAYED",
  "AVAILABLE",
];

const DRIVER_LINKED_COUNT = 20;
const UNASSIGNED_COUNT = 6;

function randomRegistration(index: number): string {
  const letters = ["PBX", "PBY", "PBZ", "PCA", "PCB", "PCC"];
  const prefix = letters[index % letters.length];
  return `${prefix}-${randomInt(1000, 9999)}`;
}

export function createTrucks(): Truck[] {
  const now = Date.now();
  const trucks: Truck[] = [];

  for (let index = 0; index < DRIVER_LINKED_COUNT; index += 1) {
    trucks.push(
      new Truck({
        id: `TRK-${100 + index}`,
        registration: randomRegistration(index),
        fleetNumber: `FL-${118 + index}`,
        model: randomItem(models),
        driverId: `DRV-${100 + index}`,
        status: randomItem(statusPool),
        location: getRandomLocation().name,
        fuelLevel: randomInt(35, 98),
        temperature: randomFloat(68, 82),
        odometer: randomInt(45000, 320000),
        nextService: now + randomInt(3, 60) * 24 * 60 * 60_000,
      })
    );
  }

  for (let index = 0; index < UNASSIGNED_COUNT; index += 1) {
    const id = DRIVER_LINKED_COUNT + index;
    trucks.push(
      new Truck({
        id: `TRK-${100 + id}`,
        registration: randomRegistration(id),
        fleetNumber: `FL-${118 + id}`,
        model: randomItem(models),
        driverId: undefined,
        status: "AVAILABLE",
        location: getRandomLocation().name,
        fuelLevel: randomInt(60, 100),
        temperature: randomFloat(65, 75),
        odometer: randomInt(20000, 280000),
        nextService: now + randomInt(3, 60) * 24 * 60 * 60_000,
      })
    );
  }

  return trucks;
}
