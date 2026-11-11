import { DriverStatus } from "@/types/logistics";

export interface TruckDriverData {
  id: string;
  name: string;
  employeeNumber: string;
  phone: string;
  truckId?: string;
  status: DriverStatus;
  currentLocation: string;
  currentRoute?: string;
  destination: string;
  shiftStart: number;
  shiftEnd: number;
  deliveryCount: number;
  lastUpdated?: number;
}

export class TruckDriver {
  id: string;
  name: string;
  employeeNumber: string;
  phone: string;
  truckId?: string;
  status: DriverStatus;
  currentLocation: string;
  currentRoute?: string;
  destination: string;
  shiftStart: number;
  shiftEnd: number;
  deliveryCount: number;
  lastUpdated: number;

  constructor(data: TruckDriverData) {
    this.id = data.id;
    this.name = data.name;
    this.employeeNumber = data.employeeNumber;
    this.phone = data.phone;
    this.truckId = data.truckId;
    this.status = data.status;
    this.currentLocation = data.currentLocation;
    this.currentRoute = data.currentRoute;
    this.destination = data.destination;
    this.shiftStart = data.shiftStart;
    this.shiftEnd = data.shiftEnd;
    this.deliveryCount = data.deliveryCount;
    this.lastUpdated = data.lastUpdated ?? Date.now();
  }

  startRoute(destination: string): TruckDriver {
    return new TruckDriver({
      ...this,
      currentRoute: destination,
      destination,
      status: "ON_ROUTE",
      lastUpdated: Date.now(),
    });
  }

  pauseRoute(): TruckDriver {
    return new TruckDriver({ ...this, status: "RESTING", lastUpdated: Date.now() });
  }

  arrive(location: string): TruckDriver {
    return new TruckDriver({
      ...this,
      currentLocation: location,
      destination: location,
      currentRoute: undefined,
      status: "UNLOADING",
      lastUpdated: Date.now(),
    });
  }

  completeDelivery(nextDestination: string): TruckDriver {
    return new TruckDriver({
      ...this,
      destination: nextDestination,
      deliveryCount: this.deliveryCount + 1,
      currentRoute: undefined,
      status: "LOADING",
      lastUpdated: Date.now(),
    });
  }

  reportIncident(): TruckDriver {
    return new TruckDriver({ ...this, status: "EMERGENCY", lastUpdated: Date.now() });
  }

  changeStatus(status: DriverStatus): TruckDriver {
    return new TruckDriver({ ...this, status, lastUpdated: Date.now() });
  }
}

