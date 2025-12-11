// @ts-nocheck
import * as d3 from 'd3';

export function computeColorScale(bopData, period) {
  // Gather all values for this period across all countries
 const values = [];

  for (const iso3 in bopData) {
    const v = bopData[iso3]?.[period];
    if (typeof v === 'number' && !Number.isNaN(v)) {
      values.push(v);
    }
  }

  // If no data found for this period
  if (values.length === 0) {
    return d3.scaleLinear()
      .domain([0, 1])
      .range(["#ccc", "#e65858"]);
  }

  const min = d3.min(values);
  const max = d3.max(values);

  // Avoid min == max (flat data)
  const safeMin = min === max ? min - 1 : min;
  const safeMax = max === max ? max + 1 : max;

  return d3.scaleLinear()
    .domain([safeMin, safeMax])   // numeric input range
    .range(["#ccc", "#e65858"]);  // color output range
}
