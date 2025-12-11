// Input: parsedRows = [{ country, period, bop, ... }, ...]
// Output: { bopData, periods }

export function transformCSVtoBOPStructure(parsedRows) {
  const bopData = {};
  const periods = new Set();

  for (const row of parsedRows) {
    const iso3 = row.country;    // assume already ISO3; convert later if needed
    const period = row.period;
    const valueRaw = row.bop;

    if (!iso3 || !period) continue;

    // Convert to number, handle missing or weird values
    const value = Number(valueRaw);
    if (Number.isNaN(value)) continue;

    periods.add(period);

    if (!bopData[iso3]) bopData[iso3] = {};
    bopData[iso3][period] = value;
  }

  return {
    bopData,
    periods: Array.from(periods).sort(),  // sorted for timeline slider
  };
}
