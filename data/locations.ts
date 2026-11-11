import { Location } from "@/types/logistics";
import { randomItem } from "@/lib/random";

// x/y are schematic percentage coordinates (0-100 x, 0-60 y) for the mock
// network map — not real-world GPS positions.
export const locations: Location[] = [
  { name: "Johannesburg Central Depot", type: "DEPOT", x: 44, y: 30 },
  { name: "Midrand Distribution Centre", type: "DISTRIBUTION_CENTRE", x: 46, y: 20 },
  { name: "East Rand Distribution Centre", type: "DISTRIBUTION_CENTRE", x: 62, y: 30 },
  { name: "Kempton Park Depot", type: "DEPOT", x: 54, y: 22 },
  { name: "N1 Midrand Interchange", type: "INTERCHANGE", x: 46, y: 16 },
  { name: "N3 Heidelberg", type: "HIGHWAY", x: 56, y: 46 },
  { name: "N12 near Germiston", type: "HIGHWAY", x: 54, y: 32 },
  { name: "M1 Grayston Interchange", type: "INTERCHANGE", x: 44, y: 25 },
  { name: "Alrode Industrial Customer Site", type: "CUSTOMER", x: 48, y: 40 },
  { name: "Wadeville Customer Site", type: "CUSTOMER", x: 52, y: 36 },
  { name: "Centurion Fuel Station", type: "FUEL_STATION", x: 44, y: 10 },
  { name: "Rustenburg Distribution Centre", type: "DISTRIBUTION_CENTRE", x: 12, y: 14 },
  { name: "Pretoria Service Centre", type: "SERVICE_CENTRE", x: 44, y: 4 },
  { name: "Vereeniging Depot", type: "DEPOT", x: 40, y: 52 },
  { name: "Durban Freight Terminal", type: "DISTRIBUTION_CENTRE", x: 90, y: 50 },
  { name: "Germiston Fuel Station", type: "FUEL_STATION", x: 56, y: 28 },
];

const DEFAULT_COORDS = { x: 50, y: 30 };

export function getLocations(): Location[] {
  return locations;
}

export function getRandomLocation(): Location {
  return randomItem(locations);
}

export function getLocationCoords(name: string): { x: number; y: number } {
  const location = locations.find((candidate) => candidate.name === name);
  return location ? { x: location.x, y: location.y } : DEFAULT_COORDS;
}

