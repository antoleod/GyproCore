import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MaterialKey, MaterialPrice } from "../types/material";
import type { Project, RoomMeasurement, Zone } from "../types/project";
import { defaultPrices, demoMeasurements, demoProject, demoZones } from "../services/demoData";

interface ProjectState {
  projects: Project[];
  zones: Zone[];
  measurements: RoomMeasurement[];
  prices: MaterialPrice[];
  activeProjectId: string;
  addProject: (project: Project) => void;
  updateMeasurement: (id: string, patch: Partial<RoomMeasurement>) => void;
  addMeasurement: (zoneId: string) => void;
  updatePrice: (materialKey: MaterialKey, unitPrice: number) => void;
  exportSnapshot: () => string;
  importSnapshot: (snapshot: string) => void;
}

const uid = () => crypto.randomUUID();

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [demoProject],
      zones: demoZones,
      measurements: demoMeasurements,
      prices: defaultPrices,
      activeProjectId: demoProject.id,
      addProject: (project) => set((state) => ({ projects: [...state.projects, project], activeProjectId: project.id })),
      updateMeasurement: (id, patch) =>
        set((state) => ({
          measurements: state.measurements.map((measurement) =>
            measurement.id === id ? { ...measurement, ...patch } : measurement,
          ),
        })),
      addMeasurement: (zoneId) =>
        set((state) => {
          const nextIndex = state.measurements.filter((measurement) => measurement.zoneId === zoneId).length + 1;
          return {
            measurements: [
              ...state.measurements,
              { id: uid(), zoneId, index: nextIndex, label: "", side1: 0, side2: 0, subtract: 0, divisor: 3 },
            ],
          };
        }),
      updatePrice: (materialKey, unitPrice) =>
        set((state) => ({
          prices: state.prices.map((price) => (price.materialKey === materialKey ? { ...price, unitPrice } : price)),
        })),
      exportSnapshot: () => JSON.stringify(get(), null, 2),
      importSnapshot: (snapshot) => {
        const parsed = JSON.parse(snapshot) as Partial<ProjectState>;
        set({
          projects: parsed.projects ?? [demoProject],
          zones: parsed.zones ?? demoZones,
          measurements: parsed.measurements ?? demoMeasurements,
          prices: parsed.prices ?? defaultPrices,
          activeProjectId: parsed.activeProjectId ?? demoProject.id,
        });
      },
    }),
    {
      name: "gyprocore-project-state",
      partialize: (state) => ({
        projects: state.projects,
        zones: state.zones,
        measurements: state.measurements,
        prices: state.prices,
        activeProjectId: state.activeProjectId,
      }),
    },
  ),
);
