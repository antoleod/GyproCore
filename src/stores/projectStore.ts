import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MaterialKey, MaterialPrice } from "../types/material";
import type { Project, RoomMeasurement, Zone } from "../types/project";
import { defaultPrices, demoMeasurements, demoProject, demoZones } from "../services/demoData";
import { createUniqueSlug } from "../utils/slug";

export type CreateProjectInput = Pick<Project, "companyName" | "clientName" | "projectName" | "address" | "city" | "currency">;
export interface CreateCalculationInput extends CreateProjectInput {
  locationName: string;
  spacing: number;
  coefficient: number;
  floorQuantity: number;
  unitQuantity: number;
  localName: string;
  side1: number;
  side2: number;
}

interface ProjectState {
  projects: Project[];
  zones: Zone[];
  measurements: RoomMeasurement[];
  prices: MaterialPrice[];
  activeProjectId: string;
  globalCurrency: "BRL" | "EUR" | "USD";
  addProject: (project: Project) => void;
  createProject: (input: CreateProjectInput) => Project;
  createCalculation: (input: CreateCalculationInput) => Project;
  setActiveProject: (projectId: string) => void;
  setGlobalCurrency: (currency: "BRL" | "EUR" | "USD") => void;
  updateZone: (id: string, patch: Partial<Zone>) => void;
  updateMeasurement: (id: string, patch: Partial<RoomMeasurement>) => void;
  addMeasurement: (zoneId: string) => void;
  deleteMeasurement: (id: string) => void;
  updatePrice: (materialKey: MaterialKey, unitPrice: number) => void;
  updateMaterialLabel: (materialKey: MaterialKey, newLabel: string) => void;
  deleteMaterial: (materialKey: MaterialKey) => void;
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
      globalCurrency: "BRL",
      addProject: (project) => set((state) => ({ projects: [...state.projects, project], activeProjectId: project.id })),
      createProject: (input) => {
        const now = new Date().toISOString();
        const project: Project = {
          id: uid(),
          slug: createUniqueSlug(input.projectName, get().projects.map((item) => item.slug).filter(Boolean)),
          companyName: input.companyName,
          clientName: input.clientName,
          projectName: input.projectName,
          address: input.address,
          city: input.city,
          currency: input.currency,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ projects: [...state.projects, project], activeProjectId: project.id }));
        return project;
      },
      createCalculation: (input) => {
        const now = new Date().toISOString();
        const project: Project = {
          id: uid(),
          slug: createUniqueSlug(input.projectName, get().projects.map((item) => item.slug).filter(Boolean)),
          companyName: input.companyName,
          clientName: input.clientName,
          projectName: input.projectName,
          address: input.address,
          city: input.city,
          currency: input.currency,
          createdAt: now,
          updatedAt: now,
        };
        const zone: Zone = {
          id: uid(),
          projectId: project.id,
          name: input.locationName,
          spacing: input.spacing,
          coefficient: input.coefficient,
          floorQuantity: input.floorQuantity,
          unitQuantity: input.unitQuantity,
          calculationType: "standard",
        };
        const measurement: RoomMeasurement = {
          id: uid(),
          zoneId: zone.id,
          index: 1,
          label: input.localName,
          side1: input.side1,
          side2: input.side2,
          subtract: 0,
          divisor: 3,
        };
        set((state) => ({
          projects: [...state.projects, project],
          zones: [...state.zones, zone],
          measurements: [...state.measurements, measurement],
          activeProjectId: project.id,
        }));
        return project;
      },
      setActiveProject: (projectId) => set({ activeProjectId: projectId }),
      setGlobalCurrency: (currency) => set({ globalCurrency: currency }),
      updateZone: (id, patch) =>
        set((state) => ({
          zones: state.zones.map((zone) => (zone.id === id ? { ...zone, ...patch } : zone)),
        })),
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
      deleteMeasurement: (id) =>
        set((state) => {
          const zoneId = state.measurements.find((m) => m.id === id)?.zoneId;
          const filtered = state.measurements.filter((m) => m.id !== id);

          // Re-index measurements for the same zone
          if (zoneId) {
            const reindexed = filtered.map((m) => {
              if (m.zoneId === zoneId) {
                const newIndex = filtered.filter((fm) => fm.zoneId === zoneId && fm.index < m.index).length + 1;
                return { ...m, index: newIndex };
              }
              return m;
            });
            return { measurements: reindexed };
          }
          return { measurements: filtered };
        }),
      updatePrice: (materialKey, unitPrice) =>
        set((state) => ({
          prices: state.prices.map((price) => (price.materialKey === materialKey ? { ...price, unitPrice } : price)),
        })),
      updateMaterialLabel: (materialKey, newLabel) =>
        set((state) => ({
          prices: state.prices.map((price) => (price.materialKey === materialKey ? { ...price, label: newLabel } : price)),
        })),
      deleteMaterial: (materialKey) =>
        set((state) => ({
          prices: state.prices.filter((price) => price.materialKey !== materialKey),
        })),
      exportSnapshot: () => JSON.stringify(get(), null, 2),
      importSnapshot: (snapshot) => {
        const parsed = JSON.parse(snapshot) as Partial<ProjectState>;
        const projects = (parsed.projects ?? [demoProject]).map((project) => ({
          ...project,
          slug: project.slug ?? createUniqueSlug(project.projectName, []),
        }));
        set({
          projects,
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
        globalCurrency: state.globalCurrency,
      }),
    },
  ),
);
