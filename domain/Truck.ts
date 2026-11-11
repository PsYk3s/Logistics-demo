import { TruckStatus } from "@/types/logistics";

export interface TruckData {
  id: string;
  registration: string;
  fleetNumber: string;
  model: string;
  driverId?: string;
  status: TruckStatus;
  location: string;
  fuelLevel: number;
  temperature: number;
  odometer: number;
  nextService: number;
  eta?: number;
  lastUpdated?: number;
}

export class Truck {
  id: string;
  registration: string;
  fleetNumber: string;
  model: string;
  driverId?: string;
  status: TruckStatus;
  location: string;
  fuelLevel: number;
  temperature: number;
  odometer: number;
  nextService: number;
  eta?: number;
  lastUpdated: number;

  constructor(data: TruckData) {
    this.id = data.id;
    this.registration = data.registration;
    this.fleetNumber = data.fleetNumber;
    this.model = data.model;
    this.driverId = data.driverId;
    this.status = data.status;
    this.location = data.location;
    this.fuelLevel = data.fuelLevel;
    this.temperature = data.temperature;
    this.odometer = data.odometer;
    this.nextService = data.nextService;
    this.eta = data.eta;
    this.lastUpdated = data.lastUpdated ?? Date.now();
  }

  startRoute(): Truck {
    return new Truck({ ...this, status: "ON_ROUTE", lastUpdated: Date.now() });
  }

  arrive(location: string): Truck {
    return new Truck({ ...this, location, status: "UNLOADING", lastUpdated: Date.now() });
  }

  startLoading(): Truck {
    return new Truck({ ...this, status: "LOADING", lastUpdated: Date.now() });
  }

  startUnloading(): Truck {
    return new Truck({ ...this, status: "UNLOADING", lastUpdated: Date.now() });
  }

  reportFault(severity: "critical" | "moderate"): Truck {
    return new Truck({ ...this, status: severity === "critical" ? "EMERGENCY" : "MAINTENANCE", lastUpdated: Date.now() });
  }

  updateTelemetry(data: Partial<Pick<TruckData, "fuelLevel" | "temperature" | "odometer" | "location">>): Truck {
    return new Truck({ ...this, ...data, lastUpdated: Date.now() });
  }
}
