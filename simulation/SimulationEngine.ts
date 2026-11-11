import { chance } from "@/lib/random";
import { SimulationState } from "@/types/simulation";
import { generate } from "./EventGenerator";
import { processEvent, progressExistingEvents, progressTickets } from "./EventProcessor";
import { SimulationClock } from "./SimulationClock";
import { createInitialState } from "./SimulationState";

type StateListener = (state: SimulationState) => void;

export class SimulationEngine {
  private clock = new SimulationClock();
  private state: SimulationState;
  private listeners: Set<StateListener> = new Set();

  constructor() {
    this.state = createInitialState();
  }

  start(): void {
    this.clock.start();
    this.clock.subscribe(() => this.tick());
  }

  stop(): void {
    this.clock.stop();
  }

  subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getState(): SimulationState {
    return this.state;
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  tick(): void {
    let next = { ...this.state, currentTime: Date.now() };
    next = progressExistingEvents(next);
    next = progressTickets(next);

    if (chance(0.65)) {
      const activity = generate(next);
      if (activity) next = processEvent(next, activity);
    }

    this.state = next;
    this.notify();
  }
}
