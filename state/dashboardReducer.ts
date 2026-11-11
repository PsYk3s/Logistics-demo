import { SimulationState } from "@/types/simulation";

export type EventFilter = "ALL" | "CRITICAL" | "WARNING" | "NORMAL";

export type DashboardView =
  | "OVERVIEW"
  | "LIVE_OPERATIONS"
  | "FLEET"
  | "DRIVERS"
  | "TICKETS"
  | "EVENTS"
  | "REPORTS";

export interface DashboardUiState {
  simulation: SimulationState;
  filter: EventFilter;
  view: DashboardView;
  lastUpdated: number;
}

export type DashboardAction =
  | { type: "SIMULATION_UPDATED"; state: SimulationState }
  | { type: "FILTER_CHANGED"; filter: EventFilter }
  | { type: "VIEW_CHANGED"; view: DashboardView };

export function dashboardReducer(state: DashboardUiState, action: DashboardAction): DashboardUiState {
  switch (action.type) {
    case "SIMULATION_UPDATED":
      return { ...state, simulation: action.state, lastUpdated: Date.now() };
    case "FILTER_CHANGED":
      return { ...state, filter: action.filter };
    case "VIEW_CHANGED":
      return { ...state, view: action.view };
    default:
      return state;
  }
}
