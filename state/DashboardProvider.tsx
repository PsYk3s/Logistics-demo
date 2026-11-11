"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { getCurrentStaff } from "@/data/staff";
import { SimulationEngine } from "@/simulation/SimulationEngine";
import { dashboardReducer, DashboardUiState, DashboardView, EventFilter } from "./dashboardReducer";

interface DashboardContextValue extends DashboardUiState {
  setFilter: (filter: EventFilter) => void;
  setView: (view: DashboardView) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const engineRef = useRef<SimulationEngine | null>(null);
  if (!engineRef.current) engineRef.current = new SimulationEngine();

  const [state, dispatch] = useReducer(dashboardReducer, {
    simulation: engineRef.current.getState(),
    filter: "ALL",
    view: "OVERVIEW",
    lastUpdated: Date.now(),
  });

  useEffect(() => {
    const engine = engineRef.current!;
    const unsubscribe = engine.subscribe((simulationState) => {
      dispatch({ type: "SIMULATION_UPDATED", state: simulationState });
    });
    engine.start();
    return () => {
      unsubscribe();
      engine.stop();
    };
  }, []);

  const value = useMemo<DashboardContextValue>(
    () => ({
      ...state,
      setFilter: (filter) => dispatch({ type: "FILTER_CHANGED", filter }),
      setView: (view) => dispatch({ type: "VIEW_CHANGED", view }),
    }),
    [state]
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}


export function useDashboard(): DashboardContextValue {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
}

export function useCurrentStaff() {
  const { simulation } = useDashboard();
  return getCurrentStaff(simulation.staff);
}
