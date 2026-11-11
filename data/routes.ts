import { Route } from "@/types/logistics";

export const routes: Route[] = [
  { id: "RT-1", origin: "Johannesburg", destination: "Pretoria", corridor: "N1", distanceKm: 58 },
  { id: "RT-2", origin: "Johannesburg", destination: "East Rand", corridor: "N12", distanceKm: 34 },
  { id: "RT-3", origin: "Johannesburg", destination: "Midrand", corridor: "N1", distanceKm: 27 },
  { id: "RT-4", origin: "Johannesburg", destination: "Vereeniging", corridor: "N1", distanceKm: 61 },
  { id: "RT-5", origin: "Pretoria", destination: "Rustenburg", corridor: "N4", distanceKm: 122 },
  { id: "RT-6", origin: "Johannesburg", destination: "Durban", corridor: "N3", distanceKm: 568 },
  { id: "RT-7", origin: "Germiston", destination: "Alrode", corridor: "N12", distanceKm: 18 },
  { id: "RT-8", origin: "Kempton Park", destination: "Centurion", corridor: "N1", distanceKm: 41 },
  { id: "RT-9", origin: "Heidelberg", destination: "Vereeniging", corridor: "N3", distanceKm: 45 },
  { id: "RT-10", origin: "Wadeville", destination: "Johannesburg Central", corridor: "N12", distanceKm: 22 },
];

export function createRoutes(): Route[] {
  return routes;
}
