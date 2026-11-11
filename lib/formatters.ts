import { formatTime } from "./dates";

export function formatETA(timestamp: number): string {
  return formatTime(timestamp);
}

export function formatDistance(km: number): string {
  return `${km.toFixed(0)} km`;
}

export function formatFuel(percent: number): string {
  return `${Math.round(percent)}%`;
}

export function formatTemperature(celsius: number): string {
  return `${celsius.toFixed(0)}°C`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
}
