import { useEffect, useState } from "react";

export interface LastMeasurement {
  localName: string;
  side1: number;
  side2: number;
}

const STORAGE_KEY = "gyprocore-last-measurement";

export function useLastMeasurement() {
  const [lastMeasurement, setLastMeasurement] = useState<LastMeasurement | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLastMeasurement(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse last measurement", e);
      }
    }
  }, []);

  const saveLastMeasurement = (measurement: LastMeasurement) => {
    setLastMeasurement(measurement);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(measurement));
  };

  return { lastMeasurement, saveLastMeasurement };
}
