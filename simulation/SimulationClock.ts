type ClockListener = (currentTime: number) => void;

export const SIMULATION_INTERVAL = 7000;

export class SimulationClock {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<ClockListener> = new Set();

  start(intervalMs: number = SIMULATION_INTERVAL): void {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      const now = Date.now();
      this.listeners.forEach((listener) => listener(now));
    }, intervalMs);
  }

  stop(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = null;
  }

  subscribe(listener: ClockListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  unsubscribe(listener: ClockListener): void {
    this.listeners.delete(listener);
  }

  getCurrentTime(): number {
    return Date.now();
  }
}
