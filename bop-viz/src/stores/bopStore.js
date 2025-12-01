import { writable, derived } from "svelte/store";
import countries from "../data/countries.json";
import bopRaw from "../data/bop.json";

//
// 1. Selected period
//
export const selectedPeriod = writable("2021-Q1");

//
// 2. Map ISO3 → value for the selected period
//
export const bopForPeriod = derived(selectedPeriod, (period) => {
  // bopRaw is expected to be an array of:
  // { iso3: "USA", period: "2020-Q1", value: number }

  const output = {};

  for (const row of bopRaw) {
    if (row.period === period) {
      output[row.iso3] = row.value;
    }
  }

  return output;
});

//
// 3. Join TopoJSON ID → BOP value through ISO3 lookup
//
export const topoBopValues = derived(
  bopForPeriod,
  (isoMap) => {
    const out = {};
    for (const c of countries) {
      const value = isoMap[c.iso3];
      out[c.id] = value ?? null;
    }
    return out;
  }
);
