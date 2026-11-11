import { Truck } from "@/domain/Truck";
import { TruckDriver } from "@/domain/TruckDriver";
import { DriverStatus, TruckStatus } from "@/types/logistics";
import { randomInt, randomItem } from "@/lib/random";
import { getRandomLocation } from "./locations";

const driverNames = [
  "Thabo Mokoena",
  "Sipho Dlamini",
  "Lerato Nkosi",
  "Johan van der Merwe",
  "Mandla Khumalo",
  "Nomvula Zulu",
  "Pieter Botha",
  "Bongani Ndlovu",
  "Zanele Mahlangu",
  "Andries Fourie",
  "Thandeka Cele",
  "Willem Kruger",
  "Nkosana Sithole",
  "Precious Radebe",
  "Francois du Plessis",
  "Sibusiso Mthembu",
  "Karabo Mabaso",
  "Hendrik Venter",
  "Ayanda Buthelezi",
  "Riaan Naude",
];

// A driver's operational status always mirrors their linked truck's status so
// counts like "trucks on route" and "drivers on route" never disagree.
const truckToDriverStatus: Partial<Record<TruckStatus, DriverStatus>> = {
  ON_ROUTE: "ON_ROUTE",
  LOADING: "LOADING",
  UNLOADING: "UNLOADING",
  DELAYED: "DELAYED",
  EMERGENCY: "EMERGENCY",
};

function deriveDriverStatus(truckStatus: TruckStatus): DriverStatus {
  return truckToDriverStatus[truckStatus] ?? randomItem<DriverStatus>(["RESTING", "OFF_DUTY"]);
}

export function createDrivers(trucks: Truck[]): TruckDriver[] {
  const now = Date.now();
  return driverNames.map((name, index) => {
    const driverId = `DRV-${100 + index}`;
    const truck = trucks.find((candidate) => candidate.driverId === driverId);
    const shiftStart = now - randomInt(1, 6) * 60 * 60_000;
    const currentLocation = truck?.location ?? getRandomLocation().name;
    let destination = getRandomLocation().name;
    while (destination === currentLocation) {
      destination = getRandomLocation().name;
    }
    return new TruckDriver({
      id: driverId,
      name,
      employeeNumber: `EMP-${4200 + index}`,
      phone: `08${randomInt(1, 9)} ${randomInt(100, 999)} ${randomInt(1000, 9999)}`,
      truckId: truck?.id ?? `TRK-${100 + index}`,
      status: truck ? deriveDriverStatus(truck.status) : "OFF_DUTY",
      currentLocation,
      currentRoute: undefined,
      destination,
      shiftStart,
      shiftEnd: shiftStart + 9 * 60 * 60_000,
      deliveryCount: randomInt(0, 6),
    });
  });
}

